import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
      super();
      this.state = {
          responseURL: ''
      }
  }

  sendTos3Pdf(e) {
      e.preventDefault()
      if (this.state.file) {
          axios.post('/api/pdfUpload', this.state.file).then((res) => {
              console.log(res.data)
              this.setState({
                  responseURL: res.data.Location
              })
          }).catch(err => {
              console.log(err)
          })
      }
  }

  uploadPDF(event) {
      // console.log('S3 Incoming')
      const reader = new FileReader(),
          file = event.target.files[0]

      reader.onload = fileIncoming => {
          console.log(fileIncoming)
          this.setState({
              file: {
                  file: fileIncoming.target.result,
                  filename: file.name,
                  filetype: file.type
              },
          })
      }
      reader.readAsDataURL(file)

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Upload PDF</h1>
          <div className="fileUploadWrapper">
            <input onChange={(e) => this.uploadPDF(e)} type="file" />
          </div>
          <button onClick={(e) => this.sendTos3Pdf(e)}>SEND PDF TO S3</button>
          {
            this.state.responseURL &&
            <a target="_blank" href={this.state.responseURL}>VIEW</a>
          }
      </div>
    );
  }
}

export default App;
