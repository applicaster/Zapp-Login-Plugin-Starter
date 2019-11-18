const CONFIG = {
  keys: {
    general: {
      activationCode: {
        endpoint: "activation_code_endpoint",
        parameter: "activation_code_parameter",
        parameterName: "activation_code_parameter_name"
      },
      heartbeatActivationService: "heartbeat_activation_service"
    },
    style: {
      mainInstructions: {
        text: 'main_instructions_text',
        font: 'main_instructions_font',
        fontSize: 'main_instructions_fontSize',
        fontColor: 'main_instructions_fontColor'
      },
      goToUrl: {
        text: 'go_to_url_text',
        font: 'go_to_url_font',
        fontSize: 'go_to_url_fontSize',
        fontColor: 'go_to_url_fontColor'
      },
      activationUrl: {
        text: 'activation_url_text',
        font: 'activation_url_font',
        fontSize: 'activation_url_fontSize',
        fontColor: 'activation_url_fontColor'
      },
      codeInstructions: {
        text: 'code_instructions_text',
        font: 'code_instructions_font',
        fontSize: 'code_instructions_fontSize',
        fontColor: 'code_instructions_fontColor'
      },
      activationCode: {
        font: 'activation_code_font',
        fontSize: 'activation_code_fontSize',
        fontColor: 'activation_code_fontColor'
      },
      QRCodeHint: {
        text: 'qr_code_hint_text',
        font: 'qr_code_hint_font',
        fontSize: 'qr_code_hint_fontSize',
        fontColor: 'qr_code_hint_fontColor'
      },
      additionalInfo: {
        key: 'additional_info', // TODO: key is not suitable name of field
        text: 'additional_info_text',
        font: 'additional_info_font',
        fontSize: 'additional_info_fontSize',
        fontColor: 'additional_info_fontColor'
      }
    }
  }
};

export default CONFIG;
