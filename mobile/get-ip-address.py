import socket
import os

ip = socket.gethostbyname_ex(socket.gethostname())[-1][0]
print(ip)

with open('.env', 'w') as file:
    file.write('REACT_NATIVE_PACKAGER_HOSTNAME=' + ip)
