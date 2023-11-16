# new: true

- Trong Mongoose, `new: true` là một tùy chọn được sử dụng khi bạn thực hiện một thao tác cập nhật (update) hoặc tạo mới (create) một bản ghi trong cơ sở dữ liệu MongoDB bằng cách sử dụng findOneAndUpdate, findByIdAndUpdate hoặc các phương thức tương tự.

- Khi bạn thiết lập `new: true`, nếu thao tác cập nhật thành công, phương thức sẽ trả về bản ghi mới sau khi đã được cập nhật. Nếu không thiết lập, phương thức sẽ trả về bản ghi trước khi cập nhật.

# upsert: true

- Trong Mongoose, tùy chọn `upsert: true` được sử dụng để chỉ định liệu phải tạo mới một bản ghi nếu nó không tồn tại hoặc cập nhật bản ghi nếu nó đã tồn tại trong cơ sở dữ liệu khi bạn thực hiện các thao tác như `update`, `updateOne`, `updateMany`, `findOneAndUpdate`, `findByIdAndUpdate`, và các phương thức tương tự.

- Khi bạn đặt `upsert: true`, nếu điều kiện tìm kiếm không tìm thấy bản ghi, Mongoose sẽ tạo một bản ghi mới với dữ liệu bạn cung cấp. Nếu điều kiện tìm kiếm tìm thấy một hoặc nhiều bản ghi, Mongoose sẽ cập nhật bản ghi đầu tiên mà nó tìm thấy.

# $setOnInsert:

- `$setOnInsert` được sử dụng để chỉ định giá trị mà bạn muốn đặt cho một trường cụ thể trong trường hợp mà một bản ghi mới được tạo. Nó được sử dụng trong kết hợp với các phương thức như update hoặc updateOne với tùy chọn upsert: true để cập nhật giá trị chỉ khi tạo mới bản ghi.
- Nếu bản ghi đã tồn tại, $setOnInsert sẽ không ảnh hưởng đến nó; nó chỉ có hiệu lực khi tạo mới bản ghi.

# $push:

- $push được sử dụng để thêm một giá trị vào một mảng có sẵn trong bản ghi MongoDB.

- Điều này thường được sử dụng khi bạn muốn thêm một giá trị mới vào một mảng trong một bản ghi đã tồn tại.

# $each:

Trong Mongoose và MongoDB, `$each` là một toán tử được sử dụng với `$push` để thêm nhiều giá trị vào một mảng cụ thể trong một bản ghi.

Khi bạn sử dụng `$push` với $each, bạn có thể thêm một mảng giá trị vào mảng đích. Điều này hữu ích khi bạn muốn thêm nhiều giá trị cùng một lúc vào một mảng.
