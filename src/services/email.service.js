import { ApiConfig, EmailJsApi } from 'src/network';
export class EmailService {
  static sendMail = (email) => {
    const data = {
      service_id: ApiConfig.emailJs.sericeId,
      template_id: ApiConfig.emailJs.templateId,
      user_id: ApiConfig.emailJs.userId,
      template_params: {
        to_name: 'Samartha H M',
        from_name: email.name,
        from_email: email.email,
        subject: 'Portfolio: query',
        message: email.query,
      },
    };
    return EmailJsApi({
      method: 'post',
      url: '',
      data: JSON.stringify(data),
    });
  };
}
