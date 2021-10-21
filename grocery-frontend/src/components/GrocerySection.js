import React, { useState, useEffect } from 'react';
import axios from "axios";
import classNames from "classnames";
export default function GrocerySection() {
    const [groceryItemInput, updateGroceryItemInput] = useState("");
    const [groceryItemsList, updateGroceryItemsList] = useState([]);
    async function getGroceryItems () {
        console.log("server url", )
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/groceryItems/list`
            );
              console.log("response", response);
              updateGroceryItemsList([...response.data.result]);
        } catch(e) {
            console.log("Some error occured while adding", e);
        }
    }
    useEffect(()=> {
        getGroceryItems();
    }, [])
    function getCurrentMonth() {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const date = new Date();
        const currentMonthInteger = date.getMonth();
        return months[currentMonthInteger];
    }
     async function addGroceryItem() {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/groceryItems/add`, {
                itemName: groceryItemInput,
                isPurchased: false
              });
              console.log("response", response);
              updateGroceryItemInput("");
              getGroceryItems();
        } catch(e) {
            console.log("Some error occured while listing", e);
        }
    }
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            console.log("enter key pressed");
            addGroceryItem();
        }
    }

    async function updatePurchaseStatus(_id) {
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/groceryItems/update`, {
                _id: _id
              });
              console.log("response", response);
              getGroceryItems();
        } catch (e) {
            console.log("Some error occured while adding", e);
        }
    }
    async function deleteItem(_id) {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/groceryItems/delete`, {
                data: {
                    _id: _id,
                },
              });
              console.log("response", response);
              getGroceryItems();
        } catch (e) {
            console.log("Some error occured while adding", e);
        }
    }
    function renderGroceryItems() {
       console.log("groceryItemsList", groceryItemsList);
       return groceryItemsList.map((groceryitem)=> {
         return ( 
         <div 
            key={groceryitem.itemName} 
            className="bg-white w-96 h-14">
                <div className=" bg-white shadow-md rounded w-auto h-12 flex justify-center items-center mt-0 px-3 mx-auto">
                <span className={classNames({'line-through': groceryitem.isPurchased === true,})}>{groceryitem.itemName}</span>
                <div className="ml-auto">
                <button className="bg-white px-2 py-0 rounded shadow-md border border-gray-400 font-medium mr-3" onClick={() => updatePurchaseStatus(groceryitem._id)}>Purchased</button>
                <button className="bg-white px-2 py-0 rounded shadow-md border border-gray-400 font-medium" onClick={() => deleteItem(groceryitem._id)}>X</button>
                </div>
                </div>
                </div>
         );
       });
    }
        return (
            <div className="w-full h-96 flex justify-center items-center flex-col">
                <span className="text-2xl">
                    Plan for the month of {getCurrentMonth()}
                </span>
                <div className="mt-4">
                   <input className="shadow-md rounded w-96 h-10 bg-white grocery-items-input" type="text" placeholder="Add Shopping Item" value={groceryItemInput} onChange={(e)=>updateGroceryItemInput(e.target.value)} onKeyDown={handleKeyDown}></input>
                </div>
                <div>
                    {renderGroceryItems()}
                </div> 
            </div>
        )
}