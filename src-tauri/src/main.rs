// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;
use std::path::PathBuf;
use tauri::command;

#[command]
fn fetchdir(dir: &str) -> Result<String, String> {
    println!("Reading directory: {}", dir.trim());
    match fs::read_dir(dir.trim()) {
        Ok(paths) => {
            let mut result = String::new();
            for path in paths {
                match path {
                    Ok(entry) => {
                        let path: PathBuf = entry.path();
                        result.push_str(&format!("{}\n", path.display()));
                    }
                    Err(err) => {
                        println!("Error reading path: {}", err);
                        return Err(format!("Error reading path: {}", err));
                    }
                }
            }
            println!("Directory contents: {}", result);
            Ok(result)
        }
        Err(err) => {
            println!("Error reading directory: {}", err);
            Err(format!("Error reading directory: {}", err))
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetchdir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
