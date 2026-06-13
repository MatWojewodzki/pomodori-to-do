const ORDER_KEY_GAP: u32 = 1000;

pub fn next_order_key(last_order_key: u32) -> u32 {
    last_order_key + ORDER_KEY_GAP
}
