import socket
import os
import sys

ip = '0.0.0.0'
custom_ip = False

if len(sys.argv) > 1:
    ip = sys.argv[1]
    custom_ip = True

if not custom_ip:
    ip = socket.gethostbyname_ex(socket.gethostname())[-1][0]

if not ip.startswith("127."):
    with open('.env', 'w') as file:
        file.write('REACT_NATIVE_PACKAGER_HOSTNAME=' + ip)
else:
    error = '\n** [ERROR] could not detect ip address' + '\n\n SOLUTION:\nuse $ make IP=your-ip-here\n\n'
    print(error)
    exit(1)
    with open('.env', 'w') as file:
        file.write('')

print(ip)
