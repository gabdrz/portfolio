import os
import shutil

def clear_folder(folder_path):
    """
    Deletes all contents of the given folder.
    """
    if os.path.exists(folder_path):
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)  # Remove file or symlink
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)  # Remove directory
            except Exception as e:
                print(f"Failed to delete {file_path}. Reason: {e}")

def generate_tree(directory, prefix="", file=None):
    entries = sorted(os.listdir(directory))  # Sort to ensure consistent order
    for i, entry in enumerate(entries):
        path = os.path.join(directory, entry)
        is_last = (i == len(entries) - 1)  # Check if the entry is the last one
        connector = "└── " if is_last else "├── "
        file.write(f"{prefix}{connector}{entry}\n")
        
        if os.path.isdir(path):  # If the entry is a folder, recurse
            new_prefix = f"{prefix}{'    ' if is_last else '│   '}"
            generate_tree(path, new_prefix, file)

def is_readable_file(file_path):
    """
    Determines if a file is a readable text file.
    Excludes non-readable formats like images, vectors, etc.
    """
    readable_extensions = {".txt", ".md", ".csv", ".json", ".log", ".ts", ".tsx", ".css", ".html"}
    excluded_extensions = {".svg", ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"}
    _, ext = os.path.splitext(file_path)

    # Exclude specific extensions
    if ext.lower() in excluded_extensions:
        return False

    # Include explicitly allowed readable extensions
    if ext.lower() in readable_extensions:
        return True

    # Fallback: Try reading to confirm if it's a readable file
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            f.read(1024)  # Try reading the first 1024 bytes
        return True
    except:
        return False

def copy_readable_files_to_claude(src_dir, dest_dir, script_name):
    """
    Copies all readable files from src_dir and its subdirectories to dest_dir.
    - Does not maintain folder structure; all files go into one flat folder.
    - Skips the claude folder itself and the running script.
    """
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    for root, _, files in os.walk(src_dir):
        # Skip the claude folder to prevent re-copying
        if os.path.abspath(root) == os.path.abspath(dest_dir):
            continue

        for file in files:
            file_path = os.path.join(root, file)

            # Skip the script itself
            if os.path.abspath(file_path) == os.path.abspath(script_name):
                continue

            if is_readable_file(file_path):  # Check if the file is readable
                dest_file_path = os.path.join(dest_dir, file)
                # Handle duplicate file names
                if os.path.exists(dest_file_path):
                    base, ext = os.path.splitext(file)
                    counter = 1
                    while os.path.exists(dest_file_path):
                        dest_file_path = os.path.join(dest_dir, f"{base}_{counter}{ext}")
                        counter += 1
                shutil.copy(file_path, dest_file_path)

if __name__ == "__main__":
    target_directory = os.getcwd()  # Default to the current working directory
    output_file = "file_structure.txt"
    claude_folder = os.path.join(target_directory, "claude")
    script_name = __file__  # Get the full path of the running script
    
    # Clear the claude folder if it exists
    print(f"Preparing the '{claude_folder}' folder...")
    clear_folder(claude_folder)
    
    # Generate file structure
    if os.path.isdir(target_directory):
        with open(output_file, "w", encoding="utf-8") as file:  # Use UTF-8 encoding
            file.write(f"{os.path.basename(target_directory)}/\n")
            generate_tree(target_directory, file=file)
        print(f"Directory structure written to '{output_file}'.")
    else:
        print(f"Error: '{target_directory}' is not a valid directory.")
        exit(1)
    
    # Copy readable files into 'claude' folder (skipping the claude folder and the script itself)
    print(f"Copying readable files into '{claude_folder}'...")
    copy_readable_files_to_claude(target_directory, claude_folder, script_name)

    # Move file_structure.txt into the claude folder
    shutil.move(output_file, os.path.join(claude_folder, output_file))
    print(f"All readable files and 'file_structure.txt' are now in '{claude_folder}'.")
