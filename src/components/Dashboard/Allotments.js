import React from "react";
import Grid from "@material-ui/core/Grid";
import Tile from "./Tile";
import NumberSection from "./NumberSection";
import { withStyles } from "@material-ui/styles";
import Counter from './Counter'
const styles = (theme) => ({});

class Allotments extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			allotmentData: [
				{
					number: "2000",
					description: "Total",
				},
				{
					number: "1950",
					description: "Alotted",
				},
				{
					number: "50",
					description: "Unallotted",
				},
			],
			requestData: [
				{
					number: "7",
					description: "For new vehicles",
				},
				{
					number: "3",
					description: "Other",
				},
			],
			fleetsData: [
				{
					number: "71",
					description: "Assigned",
				},
				{
					number: "8",
					description: "Unassigned",
				},
				{
					number: "12",
					description: "Off Road",
				},
				{
					number: "3",
					description: "Removed",
				},
			]
		}
	}

	incrementRequestDataCount = () => {
		// this.setState({
		// 	requestData: this.state.requestData.map((vehicle) => {
		// 		return ({...vehicle, number: vehicle.number + 1})
		// 	})
		// })
	}

	render() {
		const { classes } = this.props;
		const {allotmentData, requestData, fleetsData} = this.state;
		return (
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={6} lg={6}>
					<Tile
						title="ALLOTMENTS"
						body={<NumberSection data={allotmentData} />}
						height="200px"
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6} lg={6}>
					<Tile
						title="PENDING REQUESTS FOR APPROVAL"
						body={<NumberSection data={requestData} />}
						height="200px"
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6} lg={6}>
					<Tile
						title="Fleets"
						body={<NumberSection data={fleetsData} />}
						height="200px"
					/>
				</Grid>

				<Grid item xs={12} sm={12} md={6} lg={6}>
					<Tile
						title="Counter"
						body={<Counter incrementRequestDataCount={this.incrementRequestDataCount}/>}
						height="200px"
					/>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Allotments);
