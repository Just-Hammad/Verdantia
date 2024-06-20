
import { toast } from "react-toastify";


const handleUserLogUpdate = (formData , USER) => {

    const userLog = {
        userId: formData.userId,
        userName: formData.userName,
        uName: formData.uName,
        userTypeId: formData.userTypeId,
        email: formData.email,
        phone: formData.phone,
        act: formData.act,
        updatedBy: USER.userName,
        updated: new Date().toISOString()
    }

    fetch(`http://localhost:5163/UserLogs`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLog)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.text());
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(userLog);
            console.error('Error updating data:', error);
            toast.error('Error updating Data. Please try again.');
        });
};

export default handleUserLogUpdate;