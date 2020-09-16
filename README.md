# safepay-node-express
Safepay Node Endpoint


vim /etc/apache2/conf.d/userdata/ssl/includename.conf
/usr/local/cpanel/scripts/rebuildhttpdconf
/usr/local/cpanel/scripts/restartsrv_httpd

/home/tajquran/public_html/payments/safepay-node-express

pm2 start index.js
pm2 stop index.js
pm2 restart index.js
