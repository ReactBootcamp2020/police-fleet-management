import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {TableContainer, Table, TableHead,TableBody, TableRow, TableCell, Paper, Icon,Typography} from '@material-ui/core'
import {DirectionsCar, Motorcycle } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { AssignedVehicleAction } from '../../store/actions/vehicleList/vehicleListAll';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  	backgroundColor:'#fff',
  	borderRadius:'10px',
  	paddingBottom:"63px",
  },
  tableHead:{
    '& > *':{
      borderBottom:"2px solid #6c7aa2"
    }
  },
  vehicleType:{
    height: "50px",
    width: "60px",
    padding: "5px",
    textAlign: "center",
  	backgroundColor:"#f1f5f7",
  	borderRadius:"10px",
  	marginRight: "15px"
  },
  title: {
    	flexGrow: 1,
		  textTransform: "capitalize",
  	},
  titlename: {
    flexGrow: 1,
    textTransform: "capitalize",
    color: '#0168fa'
  },
  details: {
    color: '#0168fa'
  },
	vehicleName:{
		display:'flex',
	},
	vehicleNameDetails:{
		display:'flex',
		flexDirection:'column'
	}
});

const dataStructureMaker = (data, condition) => {
  let vehicleList = [];
  data.vehicles.forEach(element => {
    let vehicleObject = {};
    vehicleObject['id'] = element.id;
    vehicleObject['brand'] = element.vehicle_brand;
    vehicleObject['manufacturedYear'] = element.vehicle_mfc_year;
    vehicleObject['vehicleModel'] = element.vehicle_model;
    vehicleObject['chasisNo'] = element.chasis_no;
    vehicleObject['regNo'] = element.reg_number;
    vehicleObject['status'] = element.status ? 'Active' : 'In-Active';
    vehicleObject['vehicleType'] = element.vehicle_type;
    vehicleObject['allotmentGroup'] = _.get(data, `allotmentMap.${element.id}.0.user_id`) || 'NA';
    vehicleObject['startOdometer'] = _.get(data, `tripMapping.${element.id}.lastTrip.start_odometer_reading`);
    vehicleObject['assignedTo'] = _.get(data, `userMap.${element.id}.0.first_name`) || 'NA';
    vehicleList.push(vehicleObject);
  });
  return vehicleList;
}


function VehicleAssignmentView (props){
  const classes = useStyles();
  const {vehicleDetails} = props;
  const [assignedVehicles, setAssignedVehicles] = useState({ data: [] });


  useEffect(() => {
    if (_.isEmpty(props.VehicleListAssignedReducer) && !assignedVehicles.data.length) {
      props.fetchAssignedAction();
    } else if (!_.isEmpty(props.VehicleListAssignedReducer.data) && _.get(props.VehicleListAssignedReducer, 'status') === 'success' && !assignedVehicles.data.length) {
      let structuredData = dataStructureMaker(props.VehicleListAssignedReducer.data, 'null');
      setAssignedVehicles(() => ({
        data: [...structuredData]
      }))
    }
  })
  let vehicleArray = [...assignedVehicles.data];

  return (
    <TableContainer className={classes.table} >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Allotment Group</TableCell>
            <TableCell>Start Odometer</TableCell>
            <TableCell>Assigned to</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleArray.map((row) =>(
            <TableRow key={row.vehicleId}>
              <TableCell component="th" scope="row">
                <div>
                  {vehicleNameComponent(row, classes)}
                </div>
              </TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.allotmentGroup }</TableCell>
              <TableCell>{row.startOdometer}</TableCell>
              <TableCell>{row.assignedTo || 'NA'}</TableCell>
              <TableCell className={classes.details}>View</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function vehicleNameComponent(detail, classes){
  return(
  <div className={classes.vehicleName}>
	<div className={classes.vehicleType}>
		{detail.vehicleType == 'car'&& <DirectionsCar fontSize="large" color="primary"/>}
		{detail.vehicleType == 'Two Wheeler'&& <Motorcycle fontSize="large" color="primary"/>}
	</div>
  	<div className={classes.vehicleNameDetails}>
	  	<Typography component="h6" variant="subtitle2" color="inherit" noWrap className={classes.titlename}>
          {detail.manufacturedYear} - {detail.vehicleBrand}  {detail.vehicleModel}
        </Typography>
	  	<Typography component="p" variant="caption" color="inherit" noWrap className={classes.title}>
          	SN: {detail.chasisNo}
        </Typography>
		<Typography component="p" variant="caption" color="inherit" noWrap className={classes.title}>
          License Plate.: {detail.regNo}
        </Typography>
	</div>
  </div>)
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchAssignedAction: () => dispatch(AssignedVehicleAction()),
  }
}
const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleAssignmentView);