import csv
import json

def csv_to_json(csv_file_path, json_file_path=None):
    """
    Convert CSV file to JSON format.
    
    Args:
        csv_file_path (str): Path to the input CSV file
        json_file_path (str, optional): Path to output JSON file. 
                                      If None, returns JSON string
    
    Returns:
        str: JSON string if json_file_path is None, otherwise None
    """
    data = []
    
    with open(csv_file_path, 'r', newline='', encoding='utf-8') as csvfile:
        # Use csv.DictReader to automatically use first row as headers
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            # Create a dictionary for each row
            item = {
                "Path": row["Path"],
                "Filename": row["Filename"],
                "Keywords": row["Keywords"].split()  # Split keywords into list
            }
            data.append(item)
    
    # Convert to JSON
    json_data = json.dumps(data, indent=2, ensure_ascii=False)
    
    if json_file_path:
        with open(json_file_path, 'w', encoding='utf-8') as jsonfile:
            jsonfile.write(json_data)
        return None
    else:
        return json_data

# Example usage:
if __name__ == "__main__":
    # If you have a CSV file saved as 'data.csv'
    csv_to_json('keyword-index-processed.csv','keyword-index-processed-b.json')
  
