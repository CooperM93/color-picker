import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import chroma from 'chroma-js';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "white",
            newColorName: ""
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value => 
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }
    updateCurrentColor(newColor){
        this.setState({ currentColor: newColor.hex });
    };
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(){
        const newColor = {color: this.state.currentColor, name: this.state.newColorName};
        this.props.addNewColor(newColor);
        this.setState({newColorName: ""})
    }
    render() {
        const { paletteFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker 
                    color={currentColor} 
                    onChangeComplete={this.updateCurrentColor} 
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator 
                        variant='filled'
                        helperText='Color Name'
                        className={classes.colorNameInput}
                        value={newColorName}
                        name="newColorName"
                        onChange={this.handleChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["this field is required", "that name is taken", "color must be unique"]}
                    />
                    <Button 
                    disabled={paletteFull}
                    variant="contained" 
                    style={{ 
                        backgroundColor: paletteFull 
                            ? 'gray' 
                            : currentColor,
                        color: chroma(currentColor).luminance() <= 0.09 
                            ? "rgba(255,255,255,0.8)" 
                            : "rgba(0,0,0,0.6)"
                    }}
                    type='submit'
                    className={classes.addBtn}
                    >
                        {paletteFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>

            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);