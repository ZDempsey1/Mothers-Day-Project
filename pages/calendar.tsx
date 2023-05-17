import Navbar from '@/components/Navbar';
import useFavorites from '@/hooks/useFavorites';
import React from 'react';
import FlowerList from '@/components/FlowerList';

const Calendar = () => {

    return (
        <div className="flex flex-col">
        <Navbar />
        <div className="mt-20 text-3xl text-center">
        <h1 className='mt-20'>GOOGLE CALENDAR INTEGRATION COMING SOON!!!</h1>
        </div>
        </div>
    );
};

export default Calendar;




// pages/calendar.js
// import React from 'react';
// import ApiCalendar from 'react-google-calendar-api';

// const config = {
//   clientId: process.env.CALENDAR_CLIENT_ID || '',
//   apiKey: process.env.API_KEY || '',
//   scope: "https://www.googleapis.com/auth/calendar",
//   discoveryDocs: [
//     "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
//   ]
// }


// const apiCalendar = new ApiCalendar(config)

// export default class CalendarPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleItemClick = this.handleItemClick.bind(this);
//   }

//   handleItemClick(event, name) {
//     if (name === 'sign-in') {
//       apiCalendar.handleAuthClick()
//     } else if (name === 'sign-out') {
//       apiCalendar.handleSignoutClick();
//     }
//   }


//   render() {
//     return (
//       <div>
//         <button
//             onClick={(e) => this.handleItemClick(e, 'sign-in')}
//         >
//           sign-in
//         </button>
//         <button
//             onClick={(e) => this.handleItemClick(e, 'sign-out')}
//         >
//           sign-out
//         </button>
//       </div>
//     );
//   }
// }
