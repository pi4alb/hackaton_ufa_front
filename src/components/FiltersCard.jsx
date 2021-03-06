import {
    Button,
    MenuItem,
    Grid,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    Slider, FormLabel, FormGroup, FormControlLabel, Checkbox
} from "@material-ui/core";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {useState} from "react";
import React from 'react';
import TextField from "@material-ui/core/TextField";
import roomsData from "../data/roomsData";


const useStyles = makeStyles((theme) => ({

    root: {
        maxWidth: 800,
        margin: 16,
        padding: 24,
    },
    title: {
        textAlign: 'center'
    },
    inputFilter: {
        width: '100%',
        backgroundColor: "#F1F6FF",
        color: "#7D86A9",
    },
    search: {
        backgroundColor: '#F6AE3F',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    textField: {
        width: "100%",
        backgroundColor: "#F1F6FF",
        color: "#7D86A9",

    },
}));

const BookingButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 18,
        padding: '6px 12px',
        border: '0px solid',
        lineHeight: 1.5,
        height: 36,
        width: 224,
        backgroundColor: '#F6AE3F',
        borderRadius: "18px 18px 18px 18px",
        borderColor: '#0063cc',
    },
})(Button);

const FiltersCard = ({setRows}) => {
    const classes = useStyles();

    const [roomType, setRoomType] = useState("")
    const [floor, setFloor] = useState("")
    const [peopleRange, setPeopleRange] = useState([0, 50])
    const [facilities, setFacilities] = useState({video: false, microphone: false, wifi: false, led: false})

    const rangeMarks = [
        {
            value: 4,
            label: '4',
        },
        {
            value: 10,
            label: '10',
        },
        {
            value: 30,
            label: '30',
        },
        {
            value: 50,
            label: '50',
        },
    ];

    const handleCheckboxChange = (event) => {
        setFacilities({...facilities, [event.target.name]: event.target.checked});
    };

    return (
        <Paper elevation={3} className={classes.root}>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <Typography variant='h5' className={classes.title}>
                        ????????????
                    </Typography>
                </Grid>

                <Grid item>
                    <TextField
                        select
                        label="?????? ??????????????"
                        labelId="roomType"
                        id="roomType"
                        value={roomType}
                        onChange={(event) => {
                            setRoomType(event.target.value)
                        }}
                        variant="outlined"
                        className={classes.textField}
                        margin="dense"
                    >
                        <MenuItem value="">
                            <em>??????????</em>
                        </MenuItem>
                        <MenuItem value={'????????????????????????'}>????????????????????????</MenuItem>
                        <MenuItem value={'?????????????????? ??????'}>?????????????????? ??????</MenuItem>
                        <MenuItem value={'?????????????? ?????????????????? ??????????????'}>?????????????? ?????????????????? ??????????????</MenuItem>
                        <MenuItem value={'?????????????? ???????????????????????????? ????????????'}>?????????????? ???????????????????????????? ????????????</MenuItem>
                    </TextField>
                </Grid>

                <Grid item>
                    <TextField
                        select
                        label="????????"
                        labelId="floor"
                        id="floor"
                        value={floor}
                        onChange={(event) => {
                            setFloor(event.target.value)
                        }}
                        variant="outlined"
                        className={classes.textField}
                        margin="dense"
                    >
                        <MenuItem value="">
                            <em>??????????</em>
                        </MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                    </TextField>
                </Grid>

                <Grid item>
                    <Typography gutterBottom>
                        ??????????????????????, ??????.
                    </Typography>
                    <Slider
                        value={peopleRange}
                        onChange={(event, newValue) => {
                            setPeopleRange(newValue)
                        }}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        marks={rangeMarks}
                        min={0}
                        max={50}
                    />
                </Grid>

                <Grid item>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">????????????????????????</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={facilities.video} color="primary"
                                                   onChange={handleCheckboxChange} name="video"/>}
                                label="??????"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={facilities.microphone} color="primary"
                                                   onChange={handleCheckboxChange} name="microphone"/>}
                                label="????????????????"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={facilities.wifi} color="primary"
                                                   onChange={handleCheckboxChange} name="wifi"/>}
                                label="Wi-Fi"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={facilities.led} color="primary"
                                                   onChange={handleCheckboxChange} name="led"/>}
                                label="LED"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>

                <Grid item>
                    <BookingButton
                        className={classes.search}
                        onClick={() => {
                            let rows = roomsData
                            let filteredRows = []
                            let badIndicies = []

                            for (let i = 0; i < rows.length; i++) {
                                if (floor !== '' && rows[i].col1 !== floor) {
                                    badIndicies.push(i)
                                }
                                if (roomType !== '' && rows[i].col2 !== roomType) {
                                    badIndicies.push(i)
                                }
                                if (rows[i].col9 < peopleRange[0]) {
                                    badIndicies.push(i)
                                }
                                if (facilities.video === true && rows[i].col5 !== '+') {
                                    badIndicies.push(i)
                                }
                                if (facilities.microphone === true && rows[i].col6 !== '+') {
                                    badIndicies.push(i)
                                }
                                if (facilities.wifi === true && rows[i].col7 !== '+') {
                                    badIndicies.push(i)
                                }
                                if (facilities.led === true && rows[i].col8 !== '+') {
                                    badIndicies.push(i)
                                }
                            }

                            for (let i = 0; i < rows.length; i++) {
                                if (!badIndicies.includes(i)) {
                                    filteredRows.push(rows[i])
                                }
                            }
                            setRows(filteredRows)
                        }}>
                        ??????????
                    </BookingButton>
                </Grid>
            </Grid>
        </Paper>
    )

}
export default FiltersCard