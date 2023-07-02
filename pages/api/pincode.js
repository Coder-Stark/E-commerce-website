export default function handler(req, res) {
    let pincodes = {
        "110086" : ["Delhi", "Delhi"],
        "110003" : ["Kharagpur", "West Bengal"],
        "560017" : ["Bangalore", "Karnatka"],
    }
    res.status(200).json(pincodes);
} 