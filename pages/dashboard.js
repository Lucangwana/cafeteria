import { useState } from 'react';

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState('');
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const menuItems = {
    Coffee: 20,
    Tea: 15,
    Sandwich: 30,
    Salad: 25,
    Juice: 18,
  };
  
  const toppingsOptions = {
    Coffee: { Milk: 5, Sugar: 2, Cream: 7 },
    Tea: { Lemon: 3, Honey: 4, Ginger: 5 },
    Sandwich: { Lettuce: 3, Tomato: 4, Cheese: 5 },
    Salad: { Croutons: 4, Olives: 5,Cheese: 6 },
    Juice: { Ice: 2, Mint: 3, Lemon: 3 },
  };

  const handleItemChange = (e) => {
    const item = e.target.value;
    setSelectedItem(item);
    setToppings(Object.keys(toppingsOptions[item] || {}));
    setSelectedToppings([]); // Reset toppings when a new item is selected
    setTotalPrice(menuItems[item]); // Set the initial price to the item price
  };

  const handleToppingChange = (e) => {
    const topping = e.target.value;
    const toppingPrice = toppingsOptions[selectedItem]?.[topping] || 0;
    
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== topping));
      setTotalPrice(totalPrice - toppingPrice); // Subtract topping price
    } else {
      setSelectedToppings([...selectedToppings, topping]);
      setTotalPrice(totalPrice + toppingPrice); // Add topping price
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (selectedItem) {
      const newOrder = {
        item: selectedItem,
        toppings: selectedToppings,
        price: totalPrice,
        status: 'Pending', // Initial status of the order
      };
      setOrders([...orders, newOrder]);
      setSelectedItem(''); // Reset the selection
      setSelectedToppings([]); // Reset the toppings selection
      setTotalPrice(0); // Reset the total price
      setShowPaymentOptions(true); // Show payment options after placing an order
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmPayment = () => {
    alert(`You have selected ${paymentMethod} as your payment method. Total amount: R${totalPrice}`);
    setShowPaymentOptions(false); // Hide payment options after confirmation

    // Update the status of the last order to "In Progress"
    const updatedOrders = orders.map((order, index) =>
      index === orders.length - 1 ? { ...order, status: 'In Progress' } : order
    );
    setOrders(updatedOrders);
  };

  // Simulate order completion after some time (e.g., after 5 seconds)
  const simulateOrderCompletion = (index) => {
    setTimeout(() => {
      const updatedOrders = orders.map((order, i) =>
        i === index ? { ...order, status: 'Completed' } : order
      );
      setOrders(updatedOrders);
    }, 5000); // 5 seconds delay
  };

  // Trigger order completion simulation when the payment is confirmed
  if (orders.length > 0 && orders[orders.length - 1].status === 'In Progress') {
    simulateOrderCompletion(orders.length - 1);
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>User Dashboard</h2>
      
      <form onSubmit={handlePlaceOrder} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="order" style={{ display: 'block', marginBottom: '5px' }}>Select Your Item:</label>
          <select
            id="order"
            value={selectedItem}
            onChange={handleItemChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="" disabled>Select an item</option>
            {Object.keys(menuItems).map((item, index) => (
              <option key={index} value={item}>
                {item} - R{menuItems[item]}
              </option>
            ))}
          </select>
        </div>

        {toppings.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <h4>Select Toppings:</h4>
            {toppings.map((topping, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={topping}
                    checked={selectedToppings.includes(topping)}
                    onChange={handleToppingChange}
                  />
                  {topping} - R{toppingsOptions[selectedItem]?.[topping] || 0}
                </label>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginBottom: '15px' }}>
          <h4>Total Price: R{totalPrice}</h4>
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Place Order
        </button>
      </form>

      {showPaymentOptions && (
        <div style={{ marginTop: '20px' }}>
          <h3>Select Payment Method:</h3>
          <div style={{ marginBottom: '15px' }}>
            <label>
              <input
                type="radio"
                value="Credit Card"
                checked={paymentMethod === 'Credit Card'}
                onChange={handlePaymentMethodChange}
              />
              Credit Card
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              <input
                type="radio"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={handlePaymentMethodChange}
              />
              PayPal
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              <input
                type="radio"
                value="Cash"
                checked={paymentMethod === 'Cash'}
                onChange={handlePaymentMethodChange}
              />
              Cash
            </label>
          </div>
          <button
            onClick={handleConfirmPayment}
            style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Confirm Payment
          </button>
        </div>
      )}

      <h3>Order History:</h3>
      <ul>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              {order.item} with {order.toppings.join(', ')} - Status: {order.status} - Price: R{order.price}
            </li>
          ))
        ) : (
          <p>No orders placed yet.</p>
        )}
      </ul>
    </div>
  );
}
