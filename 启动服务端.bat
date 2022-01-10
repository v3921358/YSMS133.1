

:StartServer
set path=.\jdk\jre\bin;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%
set JRE_HOME=.\jdk\jre
set CLASSPATH=.;dist\*;
java -Xms1712m -Xmx1712m -Xss2048k -XX:ReservedCodeCacheSize=1512m -Dwzpath=wz\ -Djavax.net.ssl.keyStore=filename.keystore -Djavax.net.ssl.keyStorePassword=passwd-Djavax.net.ssl.trustStore=filename.keystore -Djavax.net.ssl.trustStorePassword=passwd server.WinStart