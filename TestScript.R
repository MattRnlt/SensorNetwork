# You need to change this script according to the assignment requirements.

TestFilePath = '/home/pi/Desktop/SensorTag_Data/SensorData.csv';
data = read.csv(file=TestFilePath)

nTS = nrow(data)                           # Number of Sampled Sensor Readings
sumKeeper = list()                               # SumKeeper initialized to zero
                                           # This test program just finds the sum of all the sensor readings in a set of samples
X = colSums(t(t(data[1:nTS,2])))           # i.

sumKeeper[[1]] = X/nTS

aveSummary <- data.frame(ThingBeingSensed=c("Lux"),AverageValue=c(sumKeeper[[1]]))

write.csv(aveSummary, file = "excFile.txt")
