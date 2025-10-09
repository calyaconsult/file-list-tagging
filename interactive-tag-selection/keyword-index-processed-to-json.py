import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    data = []
    
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        for row in csv_reader:
            # Split the Keywords string into a list of individual keywords
            row['Keywords'] = row['Keywords'].split() if row['Keywords'] else []
            data.append(row)
    
    # Write to JSON file
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4)
    
    print(f"JSON saved to {json_file_path}")

# Example usage:
csv_to_json('keyword-index-processed.csv', 'keyword-index-processed.json')
