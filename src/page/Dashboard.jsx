import React, { useEffect, useState, useCallback } from 'react'
import BarChart from '../components/BarChart';
import axios from 'axios';

const Dashboard = () => {
    const [formData, setFormData] = useState(null)
    const [charge_customers, SetCharge_customers] = useState(false);
    const [categoryData, setCategoryData] = useState([])
    const userId = sessionStorage.getItem('id')

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    

    // user data 
    const populateUserData = useCallback(async () => {
      try {
        const apiUrl = `https://stg.dhunjam.in/account/admin/${userId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (data.response === 'Success') {
          SetCharge_customers(data.data.charge_customers);
          setFormData(data.data.amount);
        } else {
          console.error(data);
          alert(data);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    }, [userId]);
  
    useEffect(() => {
      populateUserData();
    }, [populateUserData]); 
    
    useEffect(() => {
      if (formData) {
        setCategoryData([
          formData.category_6,
          formData.category_7,
          formData.category_8,
          formData.category_9,
          formData.category_10,
        ]);
        console.log(formData);
      }
    }, [formData]);

    // Sample data for the bar graph
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
    };
    
    const labels = ['Custom', 'Category 1', 'Category 2', 'Category 3', 'Category 4'];
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Categories',
          data: categoryData,
          backgroundColor: 'rgba(251, 178, 216, 0.8)',
        },
      ],
    };

    // admin data put api
    const handleSave = async (e) => {
      e.preventDefault();
      
      try {
        const response = await axios.put(`https://stg.dhunjam.in/account/admin/${userId}`, {
          amount: formData.amount,
        });
  
        // Handle the response data here
        console.log(response.data);
        populateUserData();

      } catch (error) {
        console.error('Error saving changes:', error);
      }
    };

  return (
    <div align="center">
        <h1 className='dashHead'>Social, Hebbal on Dhun Jam</h1>
        {formData && charge_customers ? 
         <form>
         <div className='dashContent'>
             <div className='charge'>
                 <div className='question'>Do you want to charge your customers for requesting songs?</div>
                 <div className='yes-no'>
                     <div className='radio-button'>
                         <input type='radio' id='yes' name='yesno' checked={!formData.charge_customers} onChange={handleInputChange} />
                         <label htmlFor='yes'>Yes</label>
                     </div>
                     <div className='radio-button'>
                         <input type='radio' id='no' name='yesno' checked={formData.charge_customers} onChange={handleInputChange} />
                         <label htmlFor='no'>No</label>
                     </div>
                 </div>

             </div>
             <div className='part'>
                 <div className='question'>Custom song request amount-</div>
                 <input
                  className='button1'
                  placeholder='e.g. $60'
                  value={formData.category_6}
                  onChange={handleInputChange}
                  name='category_6' />
             </div>
             <div className='part'>
                 <div className='question'>Regular song request amounts, from high to low-</div>
                 <div>
                     <input className='button2' 
                      placeholder='$33' 
                      value={formData.category_7} 
                      name='category_7'
                      onChange={handleInputChange} />
                     <input 
                      className='button2' 
                      placeholder='$33' 
                      value={formData.category_8} 
                      name='category_8'
                      onChange={handleInputChange} />
                     <input 
                      className='button2' 
                      placeholder='$33' 
                      value={formData.category_9} 
                      name='category_9'
                      onChange={handleInputChange} />
                     <input 
                      className='button2' 
                      placeholder='$33' 
                      value={formData.category_10} 
                      name='category_10'
                      onChange={handleInputChange} />
                 </div>
             </div>
         </div>
         <div className='graph-container'>
             <BarChart data={data} options={options} />
             <button type='submit' className='button save' onClick={handleSave}>Save</button>
         </div>
        </form>
        :
        <div></div>
        }  
    </div>
  )
}

export default Dashboard