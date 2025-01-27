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
    max_dimension = 1500
    scale = max_dimension / max(height, width)
    new_width = int(width * scale)
    new_height = int(height * scale)
    img = cv2.resize(img, (new_width, new_height))

    # Apply bilateral filter for smooth transitions while preserving edges
    smooth = cv2.bilateralFilter(img, d=7, sigmaColor=100, sigmaSpace=100)

    # Edge enhancement
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray = cv2.medianBlur(gray, 7)
    edges = cv2.adaptiveThreshold(
        gray, 255,
        cv2.ADAPTIVE_THRESH_MEAN_C,
        cv2.THRESH_BINARY,
        blockSize=9,
        C=2
    )

    # Create geometric distortion effect
    rows, cols = edges.shape
    wave_length = 30
    amplitude = 3
    for i in range(rows):
        smooth[i,:] = np.roll(smooth[i,:], int(amplitude * np.sin(i/wave_length)))

    # Combine color image with edges
    cartoon = cv2.bitwise_and(smooth, smooth, mask=edges)

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