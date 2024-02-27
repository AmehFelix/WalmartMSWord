import os



def txt(folder_path):
    # Iterate through all files in the folder
    for file in os.listdir(folder_path):
        # Get the full path of the file
        file_path = os.path.join(folder_path, file)

        # Check if the file has no extension or if it's not a .txt file
        if not os.path.splitext(file)[1] or os.path.splitext(file)[1] != '.txt':
            # Rename the file with .txt extension
            new_file_path = file_path + '.txt'
            os.rename(file_path, new_file_path)
            print(f"Renamed {file} to {os.path.basename(new_file_path)}")

#Input path here
path = r"C:\Users\ojfel\sqlite\pj1data"

txt(path)