# FileX

A simple, fast, and lightweight Rust-based file explorer. FileX is designed for speed and simplicity, providing a seamless and efficient experience for navigating and managing your files.

**Note:** This project is still in development. Contributions are welcome!

## Features
- **Navigation:** For now, all that has been implemented (other than the UI) is navigation.
- **Lightning Fast:** Built with Rust for optimal performance.
- **User-Friendly:** Simple and intuitive interface using vanilla JavaScript, HTML, and CSS.
- **Cross-Platform:** Runs on all major operating systems thanks to Tauri.

## Technologies Used

- **Rust:** The core language powering the application for high performance and safety.
- **Tauri:** Enables building smaller, faster, and more secure desktop applications.
- **Vanilla JavaScript, HTML, and CSS:** Provides a clean and responsive user interface.

## Dev Setup

### Prerequisites

- [NodeJS](https://nodejs.org/): Required for running the development server and building the project.
- [Rust](https://rust-lang.org/): The programming language used for the core functionality.

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Advaith7Joshi/fileX.git
   cd fileX
   ```

2. **Install NodeJS dependencies:**

   ```sh
   npm install
   ```

3. **Install Rust dependencies:**

   Ensure you have Rust installed. If not, install it from [rust-lang.org](https://rust-lang.org/).

4. **Run the development server:**

   ```sh
   npm run tauri dev
   ```

5. **Build the project:**

   ```sh
   npm run tauri build
   ```


## Contributing

We welcome contributions from the community. If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.