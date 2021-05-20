#!/usr/bin/env python
from socket import *
from time import ctime

def incoming(addr):
    tcpSrvSock=socket(AF_INET, SOCK_STREAM)
    tcpSrvSock.bind(ADDR)
    tcpSrvSock.listen(5)

    while True:
        print ('waiting for connection ...',ctime())
        tcpCliSock,addr = tcpSrvSock.accept()
        print ('... connected from:', addr)
        while True:
            data=tcpCliSock.recv(BUFSIZE)
            print("receive from 2:",data)
            if not data:
                break
            tcpCliSock.send(str.encode('[%s] %s'%(ctime(), data)))
            print ([ctime()],':',data)
        tcpCliSock.close()
    tcpSrvSock.close()


if __name__ == '__main__':
    HOST = "localhost"
    PORT = 8080
    BUFSIZE=1024
    ADDR=(HOST, PORT)

    # /-- network ---
    # for line in incoming(HOST, PORT):
    #     print(line)
    incoming(ADDR)