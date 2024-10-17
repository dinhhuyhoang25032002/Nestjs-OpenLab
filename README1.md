    {
      "name": "Tìm hiểu về kít wifi ESP 8266",
      "linkVideo": "https://www.youtube.com/watch?v=ATTAVxKyc6M&t=372s",
      "indexItem": [
        { "nameItem": "Cấu tạo của một thiết bị IoT" },
        { "nameItem": "Tại sao phải học lập trình ESP8266?" },
        // { nameItem: 'Sơ đồ chân ESP8266' },
        { "nameItem": "Cài đặt phần mềm" },
        { "nameItem": "Nạp chương trình cho ESP32" }
      ],
      "course": "6707ed79e0d7abb03859bfa3",
      "content": [
        {
          "contentText": ["Một thiết bị IoT thường bao gồm các thành phần sau:"],
          "dataImage":
           "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg",
          "dataPlus": [
            {
              "title": "Nguồn điện",
              "description": "Cung cấp năng lượng cho thiết bị."
            },
            {
              "title": "Bộ vi điều khiển",
              "description": "Điều khiển hoạt động của thiết bị."
            },
            {
              "title": "Cảm biến",
              "description": "Thu thập dữ liệu từ môi trường xung quanh."
            },
            {
              "title": "Bộ truyền thông",
              "description":
               " Giao tiếp với các thiết bị khác (ví dụ: Wi-Fi, Bluetooth,Ethernet,...)."
            },
            {
              "title": "Bộ điều khiển thiết bị",
              "description":
                "Điều khiển các thiết bị ngoại vi (ví dụ: động cơ, đèn)."
            }
          ]
        },
        {
          "contentText": [
           "ESP8266/32 là một vi điều khiển phổ biến và dễ sử dụng để phát triển các dự án IoT. Với khả năng kết nối không dây và nhiều tính năng tích hợp, ESP giúp đơn giản hóa quá trình phát triển và giảm chi phí. Bằng cách học lập trình ESP, bạn có thể tạo ra các sản phẩm thông minh và ứng dụng thực tế trong cuộc sống hàng ngày."
          ],
          "dataImage":
            "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg"
        },
        // {
        //   title: [
        //     'Một số tính năng của kít ESP 8266',
        //     'Chế độ hoạt động kít nodemcu esp8266',
        //   ],
        //   contentText: [
        //     'ESP32 có nhiều chân để kết nối với các thiết bị ngoại vi. Hiểu rõ sơ đồ chân là rất quan trọng để sử dụng ESP32 một cách hiệu quả. Bạn có thể tìm thấy sơ đồ chân chi tiết trên các tài liệu kỹ thuật của ESP32 hoặc trên các trang web chuyên về điện tử.',
        //     'Kít nodemcu esp8266 được tích hợp mạch nạp bên trên kít, nên chúng dễ dàng nạp code thông qua cổng micro usb. Mạch có thể được cấp nguồn thông qua cáp micro usb hoặc chân VIN trên kít, điện áp khuyến nghị từ 5V đến 7V là tốt nhất khi cấp vào chân VIN. Chíp xử lý esp8266 sử dụng điện áp 3.3V để hoạt động, do vậy khi đấu với thiết bị khác chúng ta cần lưu ý điện áp giao tiếp để đảm bảo an toàn cho chíp.',
        //     'Bộ vi điều khiển: CPU RISC 32-bit Tensilica Xtensa LX106',
        //     'Điện áp hoạt động: 3.3V',
        //     'Điện áp đầu vào: 5V từ cổng micro USB hoặc Vin',
        //     'Chân I/O kỹ thuật số: 11',
        //     'Chân đầu vào analog (ADC): 1',
        //     'Giao tiếp: UART, SPI, I2C...',
        //     'Bộ nhớ Flash: 4 MB',
        //     'SRAM: 64 KB',
        //     'Tốc độ xung nhịp : 80 MHz',
        //     'Tích hợp USB-TTL trên mạch cho phép nạp code trực tiếp và giao tiếp máy tính',
        //     'Kích thước nhỏ phù hợp với các đề tài dự án IoT',
        //     'Chíp esp8266 có 2 chế độ hoạt động:',
        //     'Hai chế độ hoạt động của chíp esp8266 được thiết lập thông qua 3 chân GPIO 0, 2, 15 với các mức logic tương ứng trong bảng sau:',
        //   ],
        //   dataPlus: [
        //     {
        //       title: 'Flash mode',
        //       description: 'Chế độ nạp chương trình vào bộ nhớ vi xử lý',
        //     },
        //     {
        //       title: 'Run mode',
        //       description: 'Chế độ hoạt động sau khi đã nạp chương trình',
        //     },
        //   ],
        //   dataImage:
        //     'https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg',
        // },

        {
          "dataTab": [
            {
              "title": "CH340",
              "image":
                "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg",
              "description": [
                "Tùy vào kít nodemcu esp8266 loại nào mà chúng ta sẽ cài đúng driver giao tiếp loại đó. Nếu đang dùng hệ điều hành Window 11, khi kết nối kít nodemcu esp8266 vào máy tính thì hệ điều hành sẽ tự động download và cài đặt driver"
              ]
            },
            {
              "title": "CP2102",
              "image":
                "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg",
              "description": [
                "Các bạn có thể click phải vào This PC -> Show more options -> Manage - > Device Manager chọn Ports(COM & LPT) để xem cổng COM đang kết nối máy tính."
              ]
            }
          ],
          "title": [
            "Cài đặt driver giao tiếp máy tính",
            "Tải và cài đặt Arduino IDE"
          ],
          "contentText": [
            "ESP8266/32 là một vi điều khiển phổ biến và dễ sử dụng để phát triển các dự án IoT. Với khả năng kết nối không dây và nhiều tính năng tích hợp, ESP giúp đơn giản hóa quá trình phát triển và giảm chi phí."
          ],
          "dataSlides": [
            {
              "image":
                "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg",
              "description":
                "Tải phần mềm Arduino IDE version 2.1.x từ website https://www.arduino.cc/en/software"
            },
            {
              "image":
                "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg",
              "description":
                "Thêm đường dẫn file json: vào File -> Preferences - > Additional boards manager URLs và dán đường dẫn bên dưới vào sau đó chọn OK."
            },
            {
              "image":
                "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg",
              "description":
                "Cài đặt board esp8266: vào Tools ->Board - >Board Manager gõ từ khóa esp8266 sau đó ấn INSTALL"
            },
            {
              "image":
                "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg"
            },
            {
              "image":
                "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg",
              "description":
                "Chọn Board esp8266 để viết chương trình: vào Tools -> Board - > esp8266 chọn board NodeMCU 1.0(ESP 12E-Module)"
            },

            {
              "image":
                "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg",
              "description":
                "Viết đoạn chương trình mẫu sau đây: <br/> void setup() { <br/> pinMode ( 2,OUTPUT) ; <br/> } <br/> void loop() { <br/> digitalWrite ( 2,HIGH) ; <br/> delay (1000 ) ; <br/> digitalWrite ( 2,LOW) ; <br/> delay(1000 ) ; <br/>  }"
            },
            {
              "image":
                "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg",
              "description":
                "Tiến hành biên dịch chương trình: vào Sketch chọn Verify/Compile"
            }
          ],
          "dataImage":
            "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg"
        },
        {
          "dataTab": [
            {
              "title": "Mở ví dụ code mẫu",
              "description": [
                "Trong Arduino IDE, vào mục File -> Examples -> Basics mở ví dụ code mẫu “Blink“."
              ]
            },
            {
              "title": "Sửa đổi code (nếu cần)",
              "description": [
               "Nếu muốn điều khiển chân khác trên ESP32, thay đổi giá trị của biến LED_BUILTIN trong code."
              ]
            },
            {
              "title": "Chọn board và cổng COM",
              "description": [
               "Nếu muốn điều khiển chân khác trên ESP32, thay đổi giá trị của biến LED_BUILTIN trong code.",
                "Vào Tools -> Port và chọn cổng COM đang kết nối với ESP32."
              ]
            },
            {
              "title": "Nạp chương trình",
              "description": [
                "Nhấn nút “Upload” trên Arduino IDE để nạp chương trình vào ESP32.",
                "Đợi quá trình nạp chương trình hoàn tất.",
                "Nhấn nút EN trên ESP32 để khởi động lại."
              ]
            }
          ]
        },
        {
           "dataVideo":
        "https://raw.githubusercontent.com/tranhung26092002/OpenLAB-Web-FE/refs/heads/dev-fe-next/src/assets/image/product/course/ai-ml/dd05cff47e48d9168059%20(1).jpg"
        }
      ]
    }
