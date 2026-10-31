CREATE TABLE table_item_labels (
  order_item_id INTEGER PRIMARY KEY,
  label TEXT NOT NULL,
  FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE
);

CREATE TABLE table_item_mutation_guard (
  valid INTEGER NOT NULL CHECK (valid = 1)
);

CREATE TRIGGER table_item_labels_delete_item
AFTER DELETE ON order_items
BEGIN
  DELETE FROM table_item_labels WHERE order_item_id = OLD.id;
END;

CREATE TRIGGER table_item_labels_close_order
AFTER UPDATE OF status ON orders
WHEN NEW.status IN ('concluido', 'cancelado')
BEGIN
  DELETE FROM table_item_labels
  WHERE order_item_id IN (SELECT id FROM order_items WHERE order_id = NEW.id);
END;
