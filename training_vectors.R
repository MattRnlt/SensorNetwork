
TrainFilePath = '/home/pi/Desktop/SensorTag_Data/SensorData.csv';
data_train = read.csv(file=TrainFilePath)

num_train =nrow(data_train)                           
num_feature=ncol(data_train)-1

train_mean_label=matrix(colMeans(data_train[3:num_train,2:7]),ncol=num_feature) #mean of each parameters 
colnames(train_mean_label)= c("lux","humidity","temperatureFromHumidity","BarometricPressure","objectTemperature","Ir Temperature")
rownames(train_mean_label)=c("feature vector")

write.csv(data.frame(train_mean_label), file = "excFile.txt")