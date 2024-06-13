import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import "./scanns.css";
import { GoArrowLeft } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiScan2Line } from "react-icons/ri";
import { useEffect, useState } from "react";
const Scanns = () => {
  const [scann, setscann] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    getAllScan();
  }, []
  );
  const getAllScan = async () => {
    try {
      const response = await fetch('http://localhost:3000/scan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setscann(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const toggleSelectItem = (id) => {
    const isSelected = selectedItems.includes(id);

    if (isSelected) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  const deleteSelectedItems = async () => {
    if (selectedItems.length === 0) {
      // Show an alert or handle the case where no items are selected
      return;
    }

    Swal.fire({
      title: 'Are you sure you want to delete selected Scan?',
      text: 'You will not be able to recover them!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const promises = selectedItems.map(async (id) => {
            const response = await fetch(`http://localhost:9001/scan/${id}`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              throw new Error(`Failed to delete item with ID: ${id}`);
            }
          });

          await Promise.all(promises);

          // Update the data after successful deletion
          getAllScan();

          Swal.fire('Deleted!', 'Selected items have been deleted.', 'success');
          setSelectedItems([]); // Clear selected items after deletion
        } catch (error) {
          console.error('Error deleting selected items:', error);
          Swal.fire('Error!', 'Failed to delete selected items.', 'error');
        }
      }
    });
  };

  const deleteItem = (data) => {
    Swal.fire({
      title: 'Are you sure you want to delete ',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:9001/scan/${data.id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete item');
          }

          // Update the data after successful deletion
          getAllScan();

          Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting item:', error);
          Swal.fire('Error!', 'Failed to delete item.', 'error');
        }
      }
    });
  };

  return (
    <div className="  container-fluid">
      <div className="scanns-header row  justify-content-between  ">
        <div className="col-12  col-md-6 col-lg-2 w-80">
          <Link to="/dashboard">
            <GoArrowLeft className="icons" />
          </Link>
        </div>
        <div className=" col-12  col-md-6 col-lg-2 w-80">
          <span className="slide-name"> User Name </span>
          <FaRegCircleUser className="icons" />
        </div>
      </div>
      <div className="row justify-content-between  mt-3">
        <div className="col-4">
          <RiScan2Line className="icons" />
          <span className="slide-name"> Scanns</span>
        </div>
        <div className="col-4">
          <button className="btn btn-danger">New Scann</button>
          <button className="btn btn-outline-danger ms-2">Stop Scann</button>
          <button className="btn btn-outline-danger ms-2" onClick={deleteSelectedItems}>Delete Scann</button>
        </div>
      </div>
      <table
        class="table table-secondary table-striped  
 mt-5"
      >
        <thead>
          <tr>
            <th>Target</th>
            <th>Scan Type</th>
            <th>Risk level</th>
            <th>Scheduled</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {scann.map((data, index) => {
            return (
              <tr key={index} className="scan-data-row">
                <td>
                  <input type="checkbox" className="scan-check-box" checked={selectedItems.includes(data.id)}
                    onChange={() => toggleSelectItem(data.id)} />
                  {data.host}
                </td>
                <td>{data.type}</td>
                <td>{data.level}</td>
                <td>{`Last Scanned ${data.date}`}</td>

                <td>{data.status}</td>
                <td>
                  <Link to={`${data.id}`} className="btn btn-outline-primary mx-2">View</Link>
                  <button className="btn btn-danger" onClick={() => { deleteItem(data) }}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Scanns;
