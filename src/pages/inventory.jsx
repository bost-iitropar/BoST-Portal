import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import emailjs from 'emailjs-com';
import "../styles/inventory.css";

Modal.setAppElement('#root');

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.INVENTORY_API_URL);
        console.log(response.data); // Log the data to check the format
        if (Array.isArray(response.data)) {
          setInventory(response.data);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // setInventory([...inventory, { itemName: 'Item 1', quantity: 10 }, { itemName: 'Item 2', quantity: 5 }])

  }, []); 

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      item_name: itemName,
      quantity: quantity,
    };

    emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, templateParams,   process.env.USER_ID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        closeModal();
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="header">
        <h1>BOST Inventory</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>SNo.</th>
            <th>Item Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.itemName}</td>
              <td>{item.quantity > 0 ? item.quantity : 'Unavailable'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button id='request_item_button' onClick={openModal}>Request Item</button>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" overlayClassName="modal-overlay">
        <h2>Request Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Item Name:
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
          </label>
          <br />
          <label>
            Quantity:
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Submit</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default Inventory;
