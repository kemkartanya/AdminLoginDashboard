import React, { useEffect, useState } from 'react'
import BarChart from '../components/BarChart';
import faker from 'faker';

const Dashboard = () => {

    const [formData, setFormData] = useState({})

    const userId = sessionStorage.getItem('id')

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // user data 
    async function populateUserData() {

        const apiUrl = 'https://stg.dhunjam.in/account/admin/' + userId;
        
        const req = await fetch(apiUrl);
		const data = await req.json()

		if (data.response === "Success") {
            // setting data
            setFormData(data.data)
            console.log(formData);
		} else {
            console.log(data)
			alert(data)
		}

    }

    useEffect(() => {
        populateUserData();
	}, [])


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
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: 'rgba(251, 178, 216, 0.8)',
        },
      ],
    };

  return (
    <div align="center">
        <h1 className='dashHead'>Social, Hebbal on Dhun Jam</h1>
        {formData ? 
         <form>
         <div className='dashContent'>
             <div className='charge'>
                 <div className='question'>Do you want to charge your customers for requesting songs?</div>
                 <div className='yes-no'>
                     <div className='radio-button'>
                         <input type='radio' id='yes' name='yesno' checked={formData.charge_customers} />
                         <label htmlFor='yes'>Yes</label>
                     </div>
                     <div className='radio-button'>
                         <input type='radio' id='no' name='yesno' checked={!formData.charge_customers} />
                         <label htmlFor='no'>No</label>
                     </div>
                 </div>

             </div>
             <div className='part'>
                 <div className='question'>Custom song request amount-</div>
                 <input className='button1' placeholder='e.g. $60' value={formData.amount.category_6} onChange={handleInputChange} />
             </div>
             <div className='part'>
                 <div className='question'>Regular song request amounts, from high to low-</div>
                 <div>
                     <input className='button2' placeholder='$33' value={formData.amount.category_7} onChange={handleInputChange} />
                     <input className='button2' placeholder='$33' value={formData.amount.category_8} onChange={handleInputChange} />
                     <input className='button2' placeholder='$33' value={formData.amount.category_9} onChange={handleInputChange} />
                     <input className='button2' placeholder='$33' value={formData.amount.category_10} onChange={handleInputChange} />
                 </div>
             </div>
         </div>
         <div className='graph-container'>
             <BarChart data={data} options={options} />
             <button className='button save'>Save</button>
         </div>
        </form>
        :
        <div>Loading...</div>
        }  
    </div>
  )
}

export default Dashboard