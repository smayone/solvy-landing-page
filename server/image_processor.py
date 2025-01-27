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

    # Resize image to a reasonable size while maintaining aspect ratio
    height, width = img.shape[:2]
    max_dimension = 800
    scale = max_dimension / max(height, width)
    new_width = int(width * scale)
    new_height = int(height * scale)
    img = cv2.resize(img, (new_width, new_height))

    # Apply bilateral filter
    color = cv2.bilateralFilter(img, 9, 300, 300)

    # Convert to grayscale and apply median blur
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray = cv2.medianBlur(gray, 7)

    # Create edge mask
    edges = cv2.adaptiveThreshold(
        gray, 255,
        cv2.ADAPTIVE_THRESH_MEAN_C,
        cv2.THRESH_BINARY,
        9, 9
    )

    # Combine color image with edges
    cartoon = cv2.bitwise_and(color, color, mask=edges)

    # Convert back to BGR for saving
    cartoon = cv2.cvtColor(cartoon, cv2.COLOR_RGB2BGR)

    # Save the image
    cv2.imwrite(output_path, cartoon)
    return True

def process_hero_image():
    # Setup paths
    input_path = "attached_assets/IMG_0615.jpeg"
    public_dir = "client/public"
    output_path = os.path.join(public_dir, "hero-cartoon.png")

    # Create public directory if it doesn't exist
    if not os.path.exists(public_dir):
        os.makedirs(public_dir)

    # Copy original image to public directory
    copyfile(input_path, os.path.join(public_dir, "IMG_0615.jpeg"))

    # Process and save cartoon version
    return cartoonize_image(input_path, output_path)