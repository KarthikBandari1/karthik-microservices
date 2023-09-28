import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {
  MdAccountCircle,
  MdEmail,
  MdDateRange,
  MdLocationOn,
} from 'react-icons/md'

import './index.css'

class RegistrationForm extends Component {
  state = {
    UserNameInput: '',
    emailInput: '',
    ageInput: '',
    locationInput: '',
    showUserNameError: false,
    showEmailError: false,
    showAgeError: false,
    showLocationError: false,
    isFormSubmitted: false,
    result: '',
    userCreated: '',
  }

  onBlurEmail = () => {
    const isValidEmail = this.validateEmail()

    this.setState({showEmailError: !isValidEmail})
  }

  onChangeEmail = event => {
    const {target} = event
    const {value} = target

    this.setState({
      emailInput: value,
    })
  }

  validateEmail = () => {
    const {emailInput} = this.state

    return emailInput !== ''
  }

  renderEmailField = () => {
    const {emailInput, showEmailError} = this.state
    const className = showEmailError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="email">
          <MdEmail />
        </label>
        <input
          type="text"
          id="email"
          className={className}
          value={emailInput}
          placeholder="Enter Your Email"
          onChange={this.onChangeEmail}
          onBlur={this.onBlurEmail}
        />
      </div>
    )
  }

  onBlurUserName = () => {
    const isValidUserName = this.validateUserName()

    this.setState({showUserNameError: !isValidUserName})
  }

  onChangeUserName = event => {
    const {target} = event
    const {value} = target

    this.setState({
      UserNameInput: value,
    })
  }

  renderUserNameField = () => {
    const {UserNameInput, showUserNameError} = this.state
    const className = showUserNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="UserName">
          <MdAccountCircle />
        </label>
        <input
          type="text"
          id="UserName"
          className={className}
          value={UserNameInput}
          placeholder="Enter Username"
          onChange={this.onChangeUserName}
          onBlur={this.onBlurUserName}
        />
      </div>
    )
  }

  validateUserName = () => {
    const {UserNameInput} = this.state

    return UserNameInput !== ''
  }

  onBlurAge = () => {
    const isValidAge = this.validateAge()

    this.setState({showAgeError: !isValidAge})
  }

  onChangeAge = event => {
    const {target} = event
    const {value} = target

    this.setState({
      ageInput: value,
    })
  }

  validateAge = () => {
    const {ageInput} = this.state

    return ageInput !== ''
  }

  renderAgeField = () => {
    const {ageInput, showAgeError} = this.state
    const className = showAgeError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="age">
          <MdDateRange />
        </label>
        <input
          type="text"
          id="age"
          className={className}
          value={ageInput}
          placeholder="Enter Your Age"
          onChange={this.onChangeAge}
          onBlur={this.onBlurAge}
        />
      </div>
    )
  }

  onBlurLocation = () => {
    const isValidLocation = this.validateLocation()

    this.setState({showLocationError: !isValidLocation})
  }

  onChangeLocation = event => {
    const {target} = event
    const {value} = target

    this.setState({
      locationInput: value,
    })
  }

  validateLocation = () => {
    const {locationInput} = this.state

    return locationInput !== ''
  }

  renderLocationField = () => {
    const {locationInput, showLocationError} = this.state
    const className = showLocationError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="location">
          <MdLocationOn />
        </label>
        <input
          type="text"
          id="location"
          className={className}
          value={locationInput}
          placeholder="Enter Your Location"
          onChange={this.onChangeLocation}
          onBlur={this.onBlurLocation}
        />
      </div>
    )
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const isValidUsername = this.validateUserName()
    const isValidEmail = this.validateEmail()
    const isValidAge = this.validateAge()
    const isValidLocation = this.validateLocation()

    const {UserNameInput, emailInput, ageInput, locationInput} = this.state
    const userDetails = {
      userId: uuidv4(),
      username: UserNameInput,
      email: emailInput,
      age: ageInput,
      location: locationInput,
    }

    const url = 'http://localhost:3001/'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.text()
    if (response.status !== 400) {
      this.setState({isFormSubmitted: true, result: data, userCreated: true})
    } else {
      this.setState({isFormSubmitted: true, result: data, userCreated: false})
    }

    if (isValidUsername && isValidEmail && isValidAge && isValidLocation) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showUserNameError: !isValidUsername,
        showEmailError: !isValidEmail,
        showAgeError: !isValidAge,
        showLocationError: !isValidLocation,
        isFormSubmitted: false,
      })
    }
    return this.userDetails
  }

  renderRegistrationForm = () => {
    const {
      showUserNameError,
      showEmailError,
      showAgeError,
      showLocationError,
    } = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        {this.renderUserNameField()}
        {showUserNameError && <p className="error-message">Required</p>}

        {this.renderEmailField()}
        {showEmailError && <p className="error-message">Required</p>}

        {this.renderAgeField()}
        {showAgeError && <p className="error-message">Required</p>}

        {this.renderLocationField()}
        {showLocationError && <p className="error-message">Required</p>}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  renderSubmissionSuccessView = () => {
    const {result, userCreated} = this.state
    console.log(userCreated)
    return (
      <div>
        {userCreated && (
          <div className="succ-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
              alt="success"
              className="success-image"
            />
            <p>Submitted Successfully</p>
            <p className="succ-text">{result}</p>
          </div>
        )}
        {userCreated === false && <p className="fail-text">{result}</p>}
      </div>
    )
  }

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
