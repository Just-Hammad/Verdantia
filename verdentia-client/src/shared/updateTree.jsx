import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleTreeUpdate = (method, formData, callback, close) => e => {
    e.preventDefault();
    console.log(formData);


    fetch(`http://localhost:5163/Trees`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.text());
        }
        return response.text();
    })
    .then(data => {
        if(callback) {
            callback();
        }
        toast.success(data);
        if (close) {
            close();
        }
    })
    .catch(error => {
        console.log(formData);
        console.error('Error updating data:', error);
        toast.error('Error updating Data. Please try again.');
    });
};

export default handleTreeUpdate;
