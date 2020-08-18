import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * @author phd
 * @project portal
 * @date 2019-06-16
 * @time 오전 10:28
 */
public class WsTest
{
    public static void main( String[] args )
    {
        URL url;//URL 주소 객체
        HttpURLConnection connection;//URL접속을 가지는 객체
        InputStream is;//URL접속에서 내용을 읽기위한 Stream
        InputStreamReader isr;
        BufferedReader br;

        try
        {
            //URL객체를 생성하고 해당 URL로 접속한다..
//            url = new URL("http://192.168.10.93:8079/dashboard/websocket.npop?message=fault_775");
//            url = new URL("http://192.168.10.93:8079/dashboard/websocket.npop?message=recovery_776");
//            url = new URL("http://121.165.242.78:8090/dashboard/websocket.npop?message=fault_775");
            url = new URL( "http://127.0.0.1:8079/v1/dashboard/websocket.npop?message=fault_A1203" );
//        	url = new URL("http://172.30.227.212:5001/dashboard/websocket.npop?message=fault_775");
//        	url = new URL("http://172.30.59.129:5001/dashboard/websocket.npop?message=fault_775");
            connection = ( HttpURLConnection ) url.openConnection();
            connection.setConnectTimeout( 3000 );
            connection.setReadTimeout( 5000 );
            connection.setDoOutput( true );
            connection.setDoInput( true );
            connection.setRequestProperty( "Content-Type", "text/html;" );
            connection.setRequestProperty( "Accept-Charset", "UTF-8" );
//            connection.setRequestProperty("Accept", "application/json");
//            connection.setRequestProperty("Content-Type", "application/json");
            connection.setUseCaches( false );
            connection.setDefaultUseCaches( false );
            connection.connect();
            int ftpResult = connection.getResponseCode();
            System.out.println( "FtpResult    " + ftpResult );
            System.out.println( "HttpResult   " + HttpURLConnection.HTTP_OK );
            connection.disconnect();
            //내용을 읽어오기위한 InputStream객체를 생성한다..
//            is = connection.getInputStream();
//            isr = new InputStreamReader(is);
//            br = new BufferedReader(isr);

            //내용을 읽어서 화면에 출력한다..
//            String buf = null;
//            while(true){
//                buf = br.readLine();
//                if(buf == null) break;
//                System.out.println(buf);
//            }
        }
        catch ( MalformedURLException mue )
        {
            System.err.println( "잘못되 URL입니다." );
            System.exit( 1 );
        }
        catch ( IOException ioe )
        {
            System.err.println( "IOException " + ioe );
            ioe.printStackTrace();
            System.exit( 1 );
        }
    }


}
