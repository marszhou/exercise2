import React from 'react';

const LoginedPage = () => {
  return (
    <div>
      登录成功了，你是xxx （只有登录成功后才会显示此页面，如果没有登录身份的时候，访问此页面都转向到/account/login）
    </div>
  );
};

export default LoginedPage;