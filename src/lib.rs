// pub fn add(left: usize, right: usize) -> usize {
//     left + right
// }

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result, 4);
//     }
// }

// Webpack is a bundler. It provides developement server for the process of serviing the bundled app
// how it works
// Source code ==> Processing ==> Output
// To start using webpack you need a configuration file that will tell webpack where the entry point is

use wasm_bindgen::prelude::*;
use web_sys::console::log_1 as log;
use base64::{ encode, decode };
use image::load_from_memory;
use image::ImageOutputFormat::Png;

#[wasm_bindgen]
pub fn grayscale(encoded_file: &str) -> String{
    //println!("from rust")
    log(&"Grayscale called".into());

    let base64_to_vector = decode(encoded_file).unwrap();
    log(&"image decoded".into());

    let mut img = load_from_memory(&base64_to_vector).unwrap();
    log(&"image loaded".into());

    img = img.grayscale();
    log(&"Grayscale effect applied".into());

    let mut buffer = vec![];
    img.write_to(&mut buffer, Png).unwrap();
    log(&"New image written".into());

    let encode_img = encode(&buffer);
    let data_url = format!("data:image/png;base64,{}", encode_img);

    data_url
}