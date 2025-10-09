
import os
from playwright.sync_api import sync_playwright

def verify_tags():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Hardcode the absolute path to the HTML file for debugging
        file_path = '/app/interactive-tag-selection/tagged-filelist-v02.html'
        print(f"Attempting to open file at: {file_path}")

        # Use a file:// URL to open the local HTML file
        page.goto(f'file://{file_path}')

        # Wait for the loading div to disappear
        page.wait_for_selector('#loading', state='hidden', timeout=10000) # 10 second timeout for debugging

        # Now that the content is loaded, wait for the file list to be visible
        page.wait_for_selector('.file-list')

        # Construct the absolute path for the screenshot
        screenshot_path = '/app/jules-scratch/verification/verification.png'
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to: {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_tags()
