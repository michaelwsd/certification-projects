import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 1. load data
df = pd.read_csv('./data/medical_examination.csv')

# 2. add overweight
df['overweight'] = (df['weight'] / ((df['height'] / 100) ** 2) > 25).astype(int)

# 3. normalize data 
df['cholesterol'] = (df['cholesterol'] > 1).astype(int)
df['gluc'] = (df['gluc'] > 1).astype(int)

# 4. draw categorical plot
def draw_cat_plot():
    # 5. melt data to long form
    # use cardio as the id column, pivot the values into long format
    df_cat = pd.melt(df,
                     id_vars=['cardio'],
                     value_vars=['cholesterol', 'gluc', 'smoke', 'alco', 'active', 'overweight']) 

    # 6. group and reformat
    # reset_index converts multi index (cardio, variable, value) back into columns, count becomes a new column called total
    df_cat = df_cat.value_counts().reset_index(name='total').sort_values(by='variable')

    # 7. draw seaborn cat plot
    fig = sns.catplot(data=df_cat, 
                      x='variable',
                      y='total',
                      hue='value',
                      col='cardio',
                      kind='bar').figure

    # 8. save figure 
    fig.savefig('catplot.png')
    return fig

# 10. draw heat map
def draw_heat_map():
    # 11. clean data
    df_heat = df[(df['ap_lo'] <= df['ap_hi']) & 
                 (df['height'] >= df['height'].quantile(0.025)) &
                 (df['height'] <= df['height'].quantile(0.975)) &
                 (df['weight'] >= df['weight'].quantile(0.025)) &
                 (df['weight'] <= df['weight'].quantile(0.975))]
    
    # 12. generate correlation matrix
    corr = df_heat.corr()

    # 13. hide half of the matrix as it's symmetric (not needed for plotting)
    mask = np.triu(np.ones_like(corr, dtype=bool))

    # 14
    fig, ax = plt.subplots(figsize=(12, 10))

    # 15
    sns.heatmap(corr, 
                mask=mask, 
                annot=True, 
                fmt='.1f', 
                center=0, 
                linewidths=0.5, 
                cbar_kws={'shrink': 0.5}, 
                ax=ax)


    # 16
    fig.savefig('heatmap.png')
    return fig