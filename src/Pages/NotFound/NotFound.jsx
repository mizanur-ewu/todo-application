import { Button, Result } from 'antd';
const NotFound = () => (
  <Result
    status="404"
    title="Oops... Page not found 404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
);
export default NotFound;