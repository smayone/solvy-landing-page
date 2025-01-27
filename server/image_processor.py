import cv2
import numpy as np
import os
from shutil import copyfile

def cartoonize_image(image_path, output_path):
    # Read the image
    img = cv2.imread(image_path)
    if img is None:
        raise Exception(f"Failed to load image from {image_path}")

    # Convert to RGB (OpenCV uses BGR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Resize image while maintaining aspect ratio
    height, width = img.shape[:2]
    max_dimension = 1500  # Increased for higher resolution
    scale = max_dimension / max(height, width)
    new_width = int(width * scale)
    new_height = int(height * scale)
    img = cv2.resize(img, (new_width, new_height))

    # Add evergreen tint to the background
    # Create a green mask
    green_tint = np.full(img.shape, [34, 139, 34], dtype=np.uint8)  # Forest Green RGB
    # Blend the original image with the green tint
    img = cv2.addWeighted(img, 0.8, green_tint, 0.2, 0)

    # Create artistic effect
    # 1. Color quantization with green emphasis
    Z = img.reshape((-1, 3))
    Z = np.float32(Z)
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    K = 8  # Number of colors
    _, label, center = cv2.kmeans(Z, K, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    # Adjust the centers to favor green hues
    center = np.uint8(center)
    center[:, 1] = np.clip(center[:, 1] + 20, 0, 255)  # Increase green channel
    res = center[label.flatten()]
    quantized = res.reshape((img.shape))

    # 2. Apply stronger bilateral filter for painterly effect
    color = cv2.bilateralFilter(quantized, d=25, sigmaColor=500, sigmaSpace=500)

    # 3. Edge enhancement
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray = cv2.medianBlur(gray, 13)
    edges = cv2.adaptiveThreshold(
        gray, 255,
        cv2.ADAPTIVE_THRESH_MEAN_C,
        cv2.THRESH_BINARY,
        blockSize=5,
        C=3
    )

    # 4. Create geometric distortion effect
    rows, cols = edges.shape
    wave_length = 20
    amplitude = 5
    for i in range(rows):
        color[i,:] = np.roll(color[i,:], int(amplitude * np.sin(i/wave_length)))

    # Combine color image with edges
    cartoon = cv2.bitwise_and(color, color, mask=edges)

    # Convert back to BGR for saving
    cartoon = cv2.cvtColor(cartoon, cv2.COLOR_RGB2BGR)

    # Save with high quality
    cv2.imwrite(output_path, cartoon, [cv2.IMWRITE_PNG_COMPRESSION, 0])
    return True

def process_hero_image():
    # Setup paths
    input_path = "./attached_assets/IMG_0615.jpeg"
    public_dir = "./client/public"
    output_path = os.path.join(public_dir, "hero-cartoon.png")

    # Create public directory if it doesn't exist
    if not os.path.exists(public_dir):
        os.makedirs(public_dir)

    # Process and save cartoon version
    return cartoonize_image(input_path, output_path)

# Process the image when this file is run
if __name__ == "__main__":
    process_hero_image()