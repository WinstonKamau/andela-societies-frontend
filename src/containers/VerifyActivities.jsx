import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityCard from '../components/activities/ActivityCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';
import stats from '../fixtures/stats';
import filterActivities from '../helpers/filterActivities';
import { verifyActivity } from '../actions/verifyActivityActions';

class VerifyActivities extends Component {
  static propTypes = {
    verifyActivity: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      allActivities: activities,
      filteredActivities: activities,
      selectedStatus: 'All',
      initialStatus: 'All',
      showUserDetails: true,
    };
  }

  handleClick = (isApproved, activityId) => {
    this.props.verifyActivity(isApproved, activityId);
  }

  /**
   * Filters state based on the selectedStatus
   * @memberof MyActivities
   */
   filterActivities = (status) => {
     this.setState({
       filteredActivities: filterActivities(status, this.state)
         .filteredActivities,
       selectedStatus: status,
     });
   };


  /**
   * @name VerifyActivities
   * @summary Renders My activities page
   * @return React node that displays the VerifyActivities page
   */
   render() {
     const { filteredActivities, selectedStatus, showUserDetails } = this.state;
     return (
       <Page>
         <div className='mainContent'>
           <div className='VerifyActivities'>
             <PageHeader
               title='Verify Activities'
               selectedStatus={selectedStatus}
               filterActivities={this.filterActivities}
             />
             <div className='activities'>
               <MasonryLayout
                 items={
                   filteredActivities.map(activity => (
                     <ActivityCard
                       id={activity.id}
                       category={activity.category}
                       date={(activity.date)}
                       description={activity.activity}
                       points={activity.points}
                       status={activity.status}
                       showUserDetails={showUserDetails}
                       page='verify-activities'
                       handleClick={this.handleClick}
                     />
                   ))
                 }
               />
             </div>
           </div>
         </div>
         <aside className='sideContent'>
           <Stats
             stats={stats}
           />
         </aside>
       </Page>
     );
   }
}

const mapDispatchToProps = dispatch => ({
  verifyActivity: (isApproved, activityId) => dispatch(verifyActivity(isApproved, activityId)),
});

export default connect(null, mapDispatchToProps)(VerifyActivities);
