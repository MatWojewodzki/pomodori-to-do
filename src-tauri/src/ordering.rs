const ORDER_KEY_GAP: u32 = 1000;

pub fn new_order_key(greatest_order_key: u32) -> u32 {
    greatest_order_key + ORDER_KEY_GAP
}
