## Slide 1

Hello. Today I would like to talk about Machine learning. In this presentation, I will try to describe what is hidden behind these two words.

To do this, I will try to talk about the definition, purpose and structure of this concept.

## Slide 2

Let's start with the definition.

Machine learning is an application of artificial intelligence (AI) that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.

It doesn't sound like simple words.
Let's try again.

Machine learning is a method of data analysis that automates analytical model building.

That's better, but it still sounds complicated.

## Slide 3

Arthur Samuel, a pioneer in the field of artificial intelligence and computer gaming, popularized the term **“Machine Learning”**. He defined machine learning as – “Field of study that gives computers the capability to learn without being explicitly programmed”.

In simple words, Machine Learning can be explained as automating and improving the learning process of computers based on their experiences without being actually programmed i.e. without any human assistance.

For example, we want to teach a child to distinguish between a dog and a cat, or just recognize them. We show him a few examples and tell him who is who. We know that there are many breeds of dogs and cats. But we don't show all possible options. And we take a few options, let's call them the basic set. And this is enough for the child to learn to recognize these animals. So with machine learning: the challenge is to teach the machine to distinguish between a cat and a dog, without going through all the possible options.

## Slide 4

Let's add few key definitions to fully understand what machine learning is and how it is related to such interesting and fashionable words Artificial Intelligence and neural networks.

**Artificial intelligence** is the name of a whole knowledge field, similar to biology or chemistry.
**Machine Learning** is a part of artificial intelligence. An important part, but not the only one.
**Neural Networks** are one of machine learning types. A popular one, but there are other good guys in the class.
**Deep Learning** is a modern method of building, training, and using neural networks. Basically, it's a new architecture.

## Slide 5

In the definitions of machine learning, there were words about programming. So let's compare traditional programming and machine learning. In traditional programming, we have input data and a program that we run to get a result called output data. In machine learning, input and output data will already be available at the input. With which we will train our machine. As a result, we expect that the machine will find a pattern. This pattern will be our result.

## Slide 6

Let's take a simple example. We have a set of pairs of numbers. Quickly or not, we notice that the values of the pairs are linked by a linear formula. It is presented below. And this is the formula for converting degrees Celsius to degrees Fahrenheit. In normal programming, this task is solved in one line.

And this formula will be our algorithm. If we need to get a new pair, it will be easy. And if you use machine learning, everything is completely different. To get any result, we first need to train the program. To do this, we need these pairs of numbers. By submitting input data, we train the program. It tries to find an algorithm that connects the numbers. After that, this selected algorithm can be used to calculate new values. This example helps you understand the difference between traditional programming and using machine learning.

## Slide 7

The goal of machine learning is to predict results based on incoming data.

**Data**. For example, if you need to teach the machine to detect a tumor from images, take pictures. Lots of pictures. If you try to predict the stock price, you need a price history.

**Features**. Also known as parameters or variables. Those could be the size of the tumor, often the appearance of the word in the text, the rate on the stock exchange. In other words, these are factors that the machine should look at.

**Algorithms**. Any problem can be solved differently. The method you choose affects the precision, performance, and size of the final model. There is one important nuance though: if the data is crappy, even the best algorithm won't help. So don't pay too much attention to the percentage of accuracy, try to acquire more data first.

## Slide 8

You must select an algorithm to teach the machine to learn. Any problem can be solved by different methods. Let's consider one of the variants of algorithm classification machine learning.

Nowadays there are four main directions in machine learning.

- Classical Machine Learning
- Reinforcement Learning
- Ensembles
- Neural Networks and Deep Learning

## Slide 9

Now consider each type in more detail with examples of algorithms.

Classical Machine Learning
The first methods came from pure statistics in the 50s of the last century. They solved formal math tasks — searching for patterns in numbers, evaluating the proximity of data points, and calculating vectors' directions.

Nowadays, half of the Internet is working on these algorithms. They are also useful when we do not have much data and need a quick prototype of the solution.

Classical machine learning is divided into two categories - **Supervised** and **Unsupervised Learning**.

**The supervised machine** has a "supervisor" or a "teacher" who gives the machine all the answers. Supervised machine learning algorithms can apply what has been learned in the past to new data using labeled examples to predict future events. Starting from the analysis of a known training dataset, the learning algorithm produces an inferred function to make predictions about the output values. The system is able to provide targets for any new input after sufficient training. The learning algorithm can also compare its output with the correct, intended output and find errors in order to modify the model accordingly.

In contrast, **unsupervised machine learning algorithms** are used when the information used to train is neither classified nor labeled. Unsupervised learning studies how systems can infer a function to describe a hidden structure from unlabeled data. The system doesn’t figure out the right output, but it explores the data and can draw inferences from datasets to describe hidden structures from unlabeled data. Data is not labeled, there's no teacher, the machine is trying to find any patterns on its own.

Clearly, the machine will learn faster with a teacher, so it's more commonly used in real-life tasks. There are two types of such tasks:

- **classification** – an object's category prediction
- **regression** – prediction of a specific point on a numeric axis

## Slide 10

**Classification** is a process of finding a function which helps in dividing the dataset into classes based on different parameters. In Classification, a computer program is trained on the training dataset and based on that training, it categorizes the data into different classes.
Classification algorithms are used to predict/Classify the discrete values such as Male or Female, True or False, Spam or Not Spam, etc.
Today used for:

- language detection
- fraud detection
- spam filtering
- recognition of handwritten characters and numbers

## Slide 11

Popular algorithms:

- Naive Bayes
- Decision Tree
- Logistic Regression
- K-Nearest Neighbours
- Support Vector Machine

## Slide 12

**Regression** is a process of finding the correlations between dependent and independent variables. It helps in predicting the continuous variables such as prediction of Market Trends, prediction of House prices, etc.
Regression is basically classification where we forecast a number instead of category. Examples are car price by its mileage, traffic by time of the day. Regression is perfect when something depends on time.

Popular algorithms:

- simple linear regression
- multiple linear regression
- polynomial regression
- support vector regression

## Slide 13

Now a few words about learning without a teacher.

Labeled data is luxury. Unsupervised type of machine learning algorithm learns from a dataset without any labels. Unsupervised learning studies tries to find hidden common features in the data, but without explicitly specifying these features. The algorithm can automatically classify or categorize the input data. Unsupervised methods help you to find features which can be useful for categorization.
The application of unsupervised learning mainly includes cluster analysis, association rule or dimensionality reduce.

Nowadays used:

- to merge close points on a map
- for image compression
- to detect abnormal behavior
- for market segmentation (types of customers, loyalty)
- to analyze and label new data

## Slide 14

**Clustering algorithms** process data to split data points into clusters. The idea is that data points with similar features should be assigned to the same cluster and that the points in different clusters should have different features. Some of the different clustering types include: _K-means clustering_, _Hierarchical clustering_.
An excellent example of clustering — markers on web maps. When you're looking for all chinese restaurants around, the clustering engine groups them to blobs with a number.

## Slide 15

**Dimensionality Reduction**
An intuitive example of dimensionality reduction can be discussed through a simple e-mail classification problem, where we need to classify whether the e-mail is spam or not. This can involve a large number of features, such as whether or not the e-mail has a generic title, the content of the e-mail, whether the e-mail uses a template, etc. However, some of these features may overlap.
Nowadays is used for:

- Recommender systems
- Fake image analysis
- Risk management
  Popular algorithms:

* Principal Component Analysis
* Singular Value Decomposition
* Latent Dirichlet allocation
* Latent Semantic Analysis

## Slide 16

Next type of Machine Learning is reinforcement learning.

**Reinforcement learning** is the training of machine learning models to make a sequence of decisions.
Reinforcement learning is used in cases when your problem is not related to data at all, but you have an environment to live in. Like a video game world or a city for self-driving car.
Surviving in an environment is a core idea of reinforcement learning. Throw poor little robot into real life, punish it for errors and reward it for right deeds.
Nowadays used for:

- Self-driving cars
- Games
- Enterprise resource management.

## Slide 17

Next one of Machine Learning is Ensemble Methods.
**Ensemble methods** combine several trees base algorithms to construct better predictive performance than a single tree base algorithm. The main principle behind the ensemble model is that a group of weak learners come together to form a strong learner, thus increasing the accuracy of the model.

Nowadays is used for: Everything that fits classical algorithm approaches (but works better), Search systems, Computer vision, Object detection
Popular algorithms:

- Random Forest
- Gradient Boosting.

There are three methods to create ensembles.

## Slide 18

**Stacking** output of several parallel models is passed as input to the last one which makes a final decision.
The key point is that the models are built on different algorithms.

## Slide 19

**Bagging** use the same algorithm but train it on different subsets of original data. In the end — just average answers.
Example of bagging: when you open your phone's camera app and see it drawing boxes around people's faces — it's probably the results of Random Forest work.

## Slide 20

**Boosting.** Algorithms are trained one by one sequentially. Each subsequent one paying most of its attention to data points that were mispredicted by the previous one. We use subsets of our data. In each subset we take a part of the data the previous algorithm failed to process. And we make a new algorithm learn to fix the errors of the previous one.
The main advantage here — a very high precision of classification. A real example of boosting — open Facebook or Google and start typing in a search query.

## Slide 21

**Neural Networks and Deep Leaning**
And the last type of machine learning is Neural Networks. But not the last in importance.

Any neural network is basically a collection of neurons and connections between them. Neuron is a function with a bunch of inputs and one output. Its task is to take all numbers from its input, perform a function on them and send the result to the output.
Connections are like channels between neurons. Each connection has only one parameter — weight. Weights tell the neuron to respond more to one input and less to another. Weights are adjusted when training — that's how the network learns.
The neurons are linked by layers, not randomly. Within a layer neurons are not connected, but they are connected to neurons of the next and previous layers. Data in the network goes strictly in one direction — from the inputs of the first layer to the outputs of the last.
Differences of deep learning from classical neural networks were in new methods of training that could handle bigger networks.

Neural Networks require large computing power and huge data sets for training. But at the output we get the best accuracy.

## Slide 22

Popular neural networks
**Convolutional Neural Networks**
Convolutional Neural Networks have been successful in identifying faces, traffic signs, searching for objects on photos and in videos objects, generating and enhancing images and improving image quality.

**Recurrent Neural Networks (RNN)**
Recurrent networks gave us useful things like neural machine translation, speech recognition and voice synthesis in smart assistants. RNNs are the best for sequential data like voice, text or music.

Only a couple of neural network architectures are considered above, there are actually more of them.

## Slide 23

Short review completed. Thank you for your patience and attention.
