import React, { useState } from 'react'
import QrReader from 'react-qr-scanner'


export default function QrScanner() {
    const [ data,setData] = useState({
        delay: 100,
        result: 'No result',
      })


      function handleScan(data:any){
        setData({delay:100,result: data,
        })
      }
      function handleError(err:any){
        console.error(err)
      }

        return (
            <div><QrReader
            delay={data.delay}
            style={{
                height: 240,
                width: 320,
              }}
            onError={handleError}
            onScan={handleScan}
            facingMode='rear'
            />
          <p>{data.result}</p></div>
          )

  
}
