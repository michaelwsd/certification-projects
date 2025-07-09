import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv("./data/epa-sea-level.csv")

    # Create scatter plot
    fig, ax = plt.subplots(figsize=(15, 5))
    ax.scatter(df['Year'], df['CSIRO Adjusted Sea Level'])

    # Create first line of best fit
    slope, intercept, *_ = linregress(df['Year'], df['CSIRO Adjusted Sea Level'])
    x_pred = pd.Series(range(1880, 2051))  # Predict from 1880 to 2050
    y_pred = intercept + slope * x_pred
    ax.plot(x_pred, y_pred, 'r', label='Best fit (1880–2050)')

    # Create second line of best fit
    df_filtered = df[df['Year'] >= 2000]
    slope, intercept, *_ = linregress(df_filtered['Year'], df_filtered['CSIRO Adjusted Sea Level'])
    x_pred = pd.Series(range(2000, 2051))  # Predict from 1880 to 2050
    y_pred = intercept + slope * x_pred
    ax.plot(x_pred, y_pred, 'g', label='Best fit 2 (1880–2050)')

    # Add labels and title
    ax.set_title("Rise in Sea Level")
    ax.set_xlabel("Year")
    ax.set_ylabel("Sea Level (inches)")
    ax.legend()
    plt.tight_layout()

    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()