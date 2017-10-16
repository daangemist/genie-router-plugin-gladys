const request = require('request-promise-native')
const debug = require('debug')('genie-router:gladys')

class GladysClient {
  construct () {
    this.accessToken = null
    this.gladysUrl = null
  }

  /**
   * @return Promise
   */
  start (config) {
    if (!config.accessToken) {
      return Promise.reject(new Error('No accessToken is configured.'))
    } else if (!config.endpoint) {
      return Promise.reject(new Error('No Gladys endpoint url configured'))
    }
    this.accessToken = config.accessToken
    this.gladysUrl = config.endpoint
    return Promise.resolve({process: this._process.bind(this)})
  }

  _process (message) {
    return this._sendMessage(message.input)
      .then((data) => {
        debug('Gladys responded with', data)
        return this._getLastReplyInConversation()
      })
      .then((data) => {
        const jsonData = JSON.parse(data)
        const lastMessage = jsonData[jsonData.length - 1]
        debug('Last message', lastMessage)
        return {output: lastMessage.text}
      })
  }

  /**
   * @return {Promise}
   */
  _sendMessage (text) {
    const body = {
      text: text
    }
    const qs = 'token=' + encodeURIComponent(this.accessToken)
    return request({
      url: this.gladysUrl + '/message?' + qs,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      json: body
    })
  }

  /**
   * Get the conversation thread for Gladys. UserId null signifies Gladys as the
   * conversation partner.
   * TODO find a way to easily get the last message in the list, the messages are sorted
   * descending. Now we just fetch them all.
   */
  _getLastReplyInConversation () {
    const qs = 'take=99999&token=' + encodeURIComponent(this.accessToken)
    return request({
      url: this.gladysUrl + '/message/user/null?' + qs,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

module.exports = new GladysClient()
