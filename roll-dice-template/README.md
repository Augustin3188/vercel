## 1. GIỚI THIỆU GAME

Game bao gồm 2 người chơi. Mỗi người chơi bao gồm các thông tin sau:

- Tên người chơi
- Điểm lần lắc hiện tại
- Điểm cộng dồn qua các lần lắc trước

Ngoài ra còn các thành phần khác :

- Nút "GAME MỚI" : để bắt đầu 1 game mới
- Nút "LẮC XÚC XẮC" : Dùng để random số của 2 con xúc xắc
- Nút "LƯU ĐIỂM" : Dùng để lưu trữ điểm của lần lắc hiện tại với các lần lắc trước
- Ô "MỨC ĐIỂM" : Dùng để nhập giá trị điểm để kết thúc game : VD: 100, 200, ...
- Các nút xúc xắc


## 2. LUẬT CHƠI

- Khi bắt đầu game, cần điền giá trị điểm để kết thúc trò chơi vào ô "MỨC ĐIỂM", nếu không điền thì mặc định là 1 số điểm nào đó vd: 100
- Người chơi nào đó (tùy chọn) sẽ bắt đầu xúc xắc trước bằng cách nhấn vào nút "LẮC XÚC XẮC". Giá trị điểm của lần chơi hiện tại sẽ được cộng dồn qua mỗi lần lắc. Nếu giá trị trong 1 trong 2 ô xúc xắc là "1" thì điểm lượt chơi hiện tại của người đó = 0, đồng thời chuyển lượt qua cho người tiếp theo.
- Nếu người chơi hiện tại muốn lưu kết quả của lần chơi đó thì bấm vào nút "LƯU ĐIỂM" điểm sẽ được cộng với điểm của các lượt chơi trước, và chuyển lượt chơi qua cho người tiếp theo
- Ai đạt được số điểm => số điểm nhập | điểm cố định đầu game thì người đó thắng cuộc
- Khi người chơi thắng cuộc cần thông báo cho người chơi

## 3. Chi tiết các bước trong game Roll Dice
- Part-1 : Giao diện game
    - Thiết kế giao diện như trong file figma

- Part-2 : Set up các thuộc tính ban đầu cho game
    - Tạo function **init**, trong function thực hiện các công việc sau: 
    - Đổi tên người chơi thành: Player 1, Player 2
    - Reset các điểm số về 0 (điểm lượt chơi + điểm tích lũy của 2 người chơi)
    - Ẩn ảnh 2 con xúc xắc
    - Xác định người chơi được chơi trước :  add class "active" cho người chơi đó
    - Gọi function **init** = sự kiện "onload"

- Part-3 : Xử lý khi lắc xúc xắc
    - Lắng nghe sự kiện khi người chơi ấn nút "Lắc xúc xắc"
    - Random 2 số có giá trị từ 1 -> 6
    - Hiển thị ảnh xúc xắc tương ứng với giá trị random ở trên
    - Trường hợp cả 2 số vừa random có giá trị != 1. Lúc này sẽ cộng dồn các giá trị thành điểm của lượt chơi hiện tại của người chơi đó
    - Trường hợp 1 trong 2 số vừa random có giá trị = 1 => đổi lượt chơi cho người khác

- Part-4 : Xử lý khi đổi người chơi
    - Khi đổi lượt chơi, cần kiểm tra người chơi hiện tại là người chơi nào. Nếu là người chơi 1 => đổi thành người chơi 2 và ngược lại
    - Ẩn 2 con súc sắc
    - Chuyển class "active" cho người chơi tiếp theo
    - Reset điểm hiện tại của cả 2 người chơi = 0

- Part-5 : Lưu trữ điểm người chơi và kiểm tra người thắng cuộc
    - Update số lượng điểm của người chơi hiện tại (điểm tích trữ qua các lần chơi trước + điểm của lần chơi hiện tại)
    - Nếu điểm của người chơi >= giá trị kết thúc game : 
        - Sửa tên người chơi đó thành "Winner"
        - Add class "winner" cho người chơi đó
        - Ẩn 2 con súc sắc
    - Nếu điểm của người chơi < giá trị kết thúc game => đổi lượt chơi