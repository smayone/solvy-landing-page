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

    # Create a mask for the subject (person)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    _, mask = cv2.threshold(blur, 127, 255, cv2.THRESH_BINARY)

    # Apply bilateral filter for smooth transitions while preserving edges
    foreground = cv2.bilateralFilter(img, d=9, sigmaColor=75, sigmaSpace=75)

    # Create dark evergreen background
    dark_green = np.full(img.shape, [0, 70, 30], dtype=np.uint8)  # Dark evergreen RGB
    background = cv2.addWeighted(img, 0.3, dark_green, 0.7, 0)
    background = cv2.GaussianBlur(background, (21, 21), 0)  # Smooth background

    # Combine foreground and background
    mask_inv = cv2.bitwise_not(mask)
    fg = cv2.bitwise_and(foreground, foreground, mask=mask)
    bg = cv2.bitwise_and(background, background, mask=mask_inv)
    result = cv2.add(fg, bg)

    # Apply artistic effect without sharp edges
    result = cv2.bilateralFilter(result, d=5, sigmaColor=150, sigmaSpace=150)

    # Convert back to BGR for saving
    result = cv2.cvtColor(result, cv2.COLOR_RGB2BGR)

    # Save with high quality
    cv2.imwrite(output_path, result, [cv2.IMWRITE_PNG_COMPRESSION, 0])
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