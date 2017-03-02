import React, {PropTypes} from 'react'
// import I18n from 'react-native-i18n'
import t from 'tcomb-form-native'

let Form = t.form.Form

export default class PetForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  render() {
    let formType = this.props.formType

    let options = {
      fields: {
      }
    }

    let username = {
      label: 'Username',
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.usernameHasError,
      error: this.props.form.fields.usernameErrorMsg
    }

    let email = {
      label: 'Email',
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.emailHasError,
      error: this.props.form.fields.emailErrorMsg
    }

    let secureTextEntry = !this.props.form.fields.showPassword

    let password = {
      label: 'Password',
      maxLength: 12,
      secureTextEntry: secureTextEntry,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordHasError,
      error: this.props.form.fields.passwordErrorMsg
    }

    let passwordAgain = {
      label: 'Password: Confirm',
      secureTextEntry: secureTextEntry,
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordAgainHasError,
      error: this.props.form.fields.passwordAgainErrorMsg
    }

    let loginForm;
    loginForm = t.struct({
      username: t.String,
      email: t.String,
      password: t.String,
      passwordAgain: t.String
    })

    options.fields['username'] = username
    options.fields['username'].placeholder = 'Username'
    options.fields['username'].autoCapitalize = 'none'
    options.fields['email'] = email
    options.fields['email'].placeholder = 'Email'
    options.fields['email'].autoCapitalize = 'none'
    options.fields['password'] = password
    options.fields['password'].placeholder = 'Password'
    options.fields['passwordAgain'] = passwordAgain
    options.fields['passwordAgain'].placeholder = 'Password Confirm'

    return (
      <Form ref='form'
            type={loginForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />
    );
  }
}
