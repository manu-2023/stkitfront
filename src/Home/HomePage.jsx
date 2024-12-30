import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import AfterGoal from './AfterGoal';
import { toast } from 'sonner';
import axios from 'axios';
import { baseurl } from '../Routing';
import Loading from '../Loading/loading';

export default function HomePage() {
    const [havegoal, setHavegoal] = useState(false);
    const [user_goal, setUser_goal] = useState('');
    const [loading,setloading]=useState(true)

    const findGoal = () => {
        const goal = Cookies.get('username_goal');
        if (goal === null || goal === undefined || goal === '') {
            setHavegoal(false);
        } else {
            setHavegoal(true);
        }
    };
    useEffect(() => {
        findGoal();
        setTimeout(()=>{
            setloading(false);
        },1500)
    }, []);

    const submitGoal = () => {
        if (user_goal.length < 10) {
            toast.error('Length should be more than 10');
        } else {
            const tokens = Cookies.get('authtoken');
            console.log('User Goal:', user_goal);

            axios.post(`${baseurl}/add-goal`, { goal_data: user_goal }, {
                headers: {
                    'authorization': `Bearer ${tokens}`,
                },
            })
            .then((res) => {
                const newToken = res.data.token;
                const newGoal = res.data.user_data.goal;
                Cookies.set('authtoken', newToken, { expires: 5 });
                Cookies.set('username_goal', newGoal, { expires: 5 });
                toast.success(res.data.message);
                setHavegoal(true);
            })
            .catch((error) => {
                toast.error('Failed to add goal. Please try again.');
                console.error('Error adding goal:', error.response ? error.response.data : error.message);
            });
        }
    };

    return ( loading ? (<Loading />) : (<div>
        {havegoal ? (
            <div>
                <AfterGoal />
            </div>
        ) : (
            <div id="goalbg">
                <div id="goalcard">
                    <textarea
                        type="text"
                        rows="5"
                        cols="45"
                        className="form form-control"
                        placeholder="Set Your One True Goal—Lock it in, No Turning Back! & You cannot change this !!!!"
                        onChange={(e) => { setUser_goal(e.target.value); }}
                        required
                    />
                    <button className="btn btn-primary" id="goal-btn" onClick={submitGoal}>Submit</button>
                </div>
            </div>
        )}
    </div>)
        
    );
}
