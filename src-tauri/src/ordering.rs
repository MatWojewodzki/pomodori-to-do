const ORDER_KEY_GAP: i32 = 1000;

pub trait Orderable {
    fn id(&self) -> &str;
    fn order_key(&self) -> i32;
}

pub enum Position<T: Orderable> {
    Front { next: T },
    Back { prev: T },
    Between { prev: T, next: T },
}

pub enum MoveAction {
    UpdateOne {
        id: String,
        new_order_key: i32,
    },
    ShiftAfter {
        order_key_to_shift_after: i32,
        delta: i32,
    },
}

pub fn new_order_key(greatest_order_key: i32) -> i32 {
    greatest_order_key + ORDER_KEY_GAP
}

pub fn move_item<T: Orderable>(item: T, destination: Position<T>) -> Vec<MoveAction> {
    match destination {
        Position::Front { next } => vec![MoveAction::UpdateOne {
            id: item.id().to_string(),
            new_order_key: next.order_key() - ORDER_KEY_GAP,
        }],
        Position::Back { prev } => vec![MoveAction::UpdateOne {
            id: item.id().to_string(),
            new_order_key: prev.order_key() + ORDER_KEY_GAP,
        }],
        Position::Between { prev, next } => {
            let mut actions = Vec::new();
            let needs_shift = next.order_key() - prev.order_key() < 2;

            if needs_shift {
                actions.push(MoveAction::ShiftAfter {
                    order_key_to_shift_after: prev.order_key(),
                    delta: ORDER_KEY_GAP,
                });
            }

            let shift = if needs_shift { ORDER_KEY_GAP } else { 0 };
            actions.push(MoveAction::UpdateOne {
                id: item.id().to_string(),
                new_order_key: (prev.order_key() + next.order_key() + shift) / 2,
            });
            actions
        }
    }
}
